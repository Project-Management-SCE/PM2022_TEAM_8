/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "\\.(css|less|scss)$": "./jest/stub-transformer.js"
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1"
  },
  moduleDirectories: ["node_modules", "src"],
};
