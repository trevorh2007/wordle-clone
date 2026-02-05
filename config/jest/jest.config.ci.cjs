const baseConfig = require('./jest.config.cjs');

module.exports = {
  ...baseConfig,
  ci: true,
  maxWorkers: 2,
  bail: 1,
  collectCoverage: true,
  coverageReporters: ['json', 'lcov', 'text', 'clover'],
};
