import fs from 'fs';
import { getTsconfig } from 'get-tsconfig';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tsconfigPath = path.resolve(__dirname, './tsconfig.json');
const tsconfigContent = fs.readFileSync(tsconfigPath, 'utf-8');
const tsconfigFromFile = JSON.parse(tsconfigContent);

const { compilerOptions: compilerOptionsFromFile } = tsconfigFromFile;

const tsJestOptions = {
  isolatedModules: true,
  useESM: true, // ts-jest가 ESM 코드를 출력하도록 설정
  tsconfig: {
    ...compilerOptionsFromFile, // 로컬 tsconfig.json의 compilerOptions 사용
    declaration: false, // 기존 설정 유지
    sourceMap: true, // 기존 설정 유지
  },
};

// get-tsconfig를 사용하여 tsconfig (상속 포함) 로드
const tsconfigFromGetTsconfig = getTsconfig(); // 현재 워크스페이스 기준
const compilerOptionsFromGetTsconfig = tsconfigFromGetTsconfig?.config?.compilerOptions || {};
const { baseUrl, paths } = compilerOptionsFromGetTsconfig;

const customModuleNameMapper = Object.entries(paths || {}).reduce((acc, [pathKey, mappingValues]) => {
  const firstMapping = Array.isArray(mappingValues) ? mappingValues[0] : mappingValues;

  if (firstMapping) {
    let newPathKey = `^${pathKey.replace(/\/\*$/, '/(.*)$')}`;
    let newMappingValue = firstMapping.replace(/^\.?\.\/(?:(.*)\/)?\*$/, '$1');
    newMappingValue = newMappingValue ? `/${newMappingValue}` : '';

    if (newMappingValue.startsWith('/test')) {
      acc[newPathKey] = '<rootDir>' + newMappingValue + '/$1';
    } else {
      const baseUrlPrefix = baseUrl ? `/${baseUrl.replace(/^\.\//, '')}` : '';
      acc[newPathKey] = `<rootDir>${baseUrlPrefix}${newMappingValue}/$1`;
    }
  }
  return acc;
}, {});

/** @type {import('jest').Config} */
const config = {
  verbose: true,
  testEnvironment: 'node',
  errorOnDeprecated: true,
  maxWorkers: '50%',
  workerIdleMemoryLimit: '2GB',
  testRegex: '\\.(test|spec)\\.ts$', // .ts 테스트 파일을 대상으로 함
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  transform: {
    '^.+\\.ts$': ['ts-jest', tsJestOptions], // ts-jest가 .ts 테스트 파일 변환
  },
  // moduleFileExtensions: ['ts', 'mts', 'js', 'mjs'], // ESM 환경이므로 mjs, mts 포함
  moduleNameMapper: customModuleNameMapper,
  setupFilesAfterEnv: ['jest-expect-message'], // 이 파일도 ESM 호환되어야 할 수 있음
  coverageReporters: ['text-summary', 'html'],
  collectCoverageFrom: ['src/**/*.ts'],
  extensionsToTreatAsEsm: ['.ts', '.mts'], // .ts, .mts 파일을 ESM으로 처리하도록 Jest에 명시 [5]
  // ts-jest의 useESM:true와 함께 사용
};

export default config;
