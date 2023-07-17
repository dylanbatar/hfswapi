module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js'],
  testMatch: ['**/__tests__/**/*.js'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['./src/app/People/abstractPeople', './src/app/Planet/Planet'],
};
