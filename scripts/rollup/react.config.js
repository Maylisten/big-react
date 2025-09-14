import path from 'path';
import {
	getBaseRollupPlugins,
	getPackageJson,
	resolvePkgPath
} from './utils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';

const { module } = getPackageJson('react');

const pkgPath = resolvePkgPath('react');

const pkgDistPath = resolvePkgPath('react', true);

export default [
	// react
	{
		input: path.resolve(pkgPath, module),
		output: {
			file: path.resolve(pkgDistPath, 'index.js'),
			name: 'index.js',
			format: 'umd'
		},
		plugins: [
			...getBaseRollupPlugins(),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version
				})
			})
		]
	},
	{
		input: path.resolve(pkgPath, 'src/jsx.ts'),
		output: [
			// jsx-runtime
			{
				file: path.resolve(pkgDistPath, 'jsx-runtime.js'),
				name: 'jsx-runtime.js',
				format: 'umd'
			},
			// jsx-dev-runtime
			{
				file: path.resolve(pkgDistPath, 'jsx-dev-runtime.js'),
				name: 'jsx-dev-runtime.js',
				format: 'umd'
			}
		],
		plugins: getBaseRollupPlugins()
	}
];
