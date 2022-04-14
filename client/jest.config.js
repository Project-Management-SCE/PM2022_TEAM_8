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
    "^~(.*)$": "<rootDir>/src/$1",
    "\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$": "<rootDir>/jest/mock-png.js",
  },
  moduleDirectories: ["node_modules", "src"],
};

