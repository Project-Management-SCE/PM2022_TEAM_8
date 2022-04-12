/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: {
    "^src/(.*)": "<rootDir>/src/$1",
  },
  transform: {
    "\\.(css|less|scss)$": "./jest/stub-transformer.js"
  },
  moduleDirectories: ["node_modules", "src"],
};
