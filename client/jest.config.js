const TEST_REGEX = "(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|js?|tsx?|ts?)$";
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testRegex: TEST_REGEX,
  transform: {
    "\\.(css|less|scss)$": "./jest/stub-transformer.js",
    "^.+\\.tsx?$": "babel-jest",
    "^.+\\.tsx?$": "ts-jest",
  },
  moduleFileExtensions: ["ts", "tsx", "js", "jsx", "json"],
  testPathIgnorePatterns: ["<rootDir>/build/", "<rootDir>/node_modules/", "<rootDir>/dist/"],
  moduleNameMapper: {
    "^~(.*)$": "<rootDir>/src/$1"
  },
  moduleDirectories: ["node_modules", "src"],
};

