module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'mjs'],
  transform: {
    '^.+\\.(ts|tsx)$': 'ts-jest',
    '^.+\\.m?js$': 'babel-jest'
  },
  transformIgnorePatterns: [],
  testMatch: ['**/tests/**/*.test.ts', '**/tests/**/*.test.tsx'],
  extensionsToTreatAsEsm: ['.ts']
};
