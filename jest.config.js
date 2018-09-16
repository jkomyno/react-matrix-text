module.exports = {
	globals: {
		'ts-jest': {
			tsConfigFile: 'tsconfig.json'
		}
	},
	moduleFileExtensions: [
    'js',
    'jsx',
    'ts',
    'tsx'
	],
	transform: {
		'^.+\\.(ts|tsx)$': 'ts-jest'
	},
	testMatch: [
		'**/__tests__/**/*.test.(ts|js|tsx|jsx)'
	],
  testEnvironment: 'node',
  setupTestFrameworkScriptFile: '<rootDir>/__tests__/setup.ts',
};
