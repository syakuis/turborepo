import { getTsconfig } from 'get-tsconfig';

const tsconfig = getTsconfig();
const { baseUrl, paths } = tsconfig?.config?.compilerOptions || {};

const generateModuleNameMapper = () => {
  const mapper = {};

  if (paths) {
    Object.entries(paths).forEach(([path, [mapping]]) => {
      // 경로 패턴 변환
      const pathPattern = `^${path.replace(/\/\*$/, '/(.*)$')}`;

      // 매핑 경로 정리
      let mappingPath = mapping.replace(/^\.?\.\/(?:(.*)\/)?\*$/, '$1');
      mappingPath = mappingPath ? `/${mappingPath}` : '';

      // 최종 매핑 경로 생성
      const finalMapping = mappingPath.startsWith('/test')
        ? '<rootDir>' + mappingPath + '/$1'
        : '<rootDir>' + (baseUrl ? `/${baseUrl.replace(/^\.\//, '')}` : '') + mappingPath + '/$1';

      mapper[pathPattern] = finalMapping;
    });
  }

  // 모노레포 패키지 매핑 추가
  mapper['^@autocast/(.*)$'] = '<rootDir>../../packages/autocast-$1/src';

  // .js 확장자 해결을 위한 추가 매핑
  mapper['^(.+)\\.js$'] = '$1';

  return mapper;
};

const tsJestOptions = {
  useESM: true,
  isolatedModules: false,
  tsconfig: {
    ...tsconfig.config.compilerOptions,
  },
};

/** @type {import('jest').Config} */
export default {
  verbose: true,
  testEnvironment: 'node',
  errorOnDeprecated: true,
  preset: 'ts-jest/presets/default-esm',
  extensionsToTreatAsEsm: ['.ts'],
  testRegex: '\\.(test|spec)\\.(js|mjs|ts)$',
  testPathIgnorePatterns: ['/dist/', '/node_modules/'],
  transform: {
    '^.+\\.ts$': ['ts-jest', tsJestOptions],
  },
  transformIgnorePatterns: [
    'node_modules/(?!(@autocast)/)'
  ],
  moduleNameMapper: generateModuleNameMapper(),
  moduleFileExtensions: ['js', 'mjs', 'ts', 'json'],
  collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts'],
  resolver: undefined,
  moduleDirectories: ['node_modules', '<rootDir>/packages'],
  modulePaths: ['<rootDir>/packages'],
};
