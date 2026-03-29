import baseConfig from '../../jest.config.js';

/** @type {import('jest').Config} */
export default {
  ...baseConfig,
  testTimeout: 50_000,
  forceExit: false,
  detectOpenHandles: true,
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.jest.json'
    }
  }
};
