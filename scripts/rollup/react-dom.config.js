import path from 'path';
import {
	getBaseRollupPlugins,
	getPackageJson,
	resolvePkgPath
} from './utils.js';
import generatePackageJson from 'rollup-plugin-generate-package-json';
import alias from '@rollup/plugin-alias';

const { module } = getPackageJson('react-dom');

const pkgPath = resolvePkgPath('react-dom');

const pkgDistPath = resolvePkgPath('react-dom', true);

export default [
	// react
	{
		input: path.resolve(pkgPath, module),
		output: [
			{
				file: path.resolve(pkgDistPath, 'index.js'),
				name: 'ReactDOM',
				format: 'umd'
			},
			{
				file: path.resolve(pkgDistPath, 'client.js'),
				name: 'ReactDOMClient',
				format: 'umd'
			}
		],
		plugins: [
			...getBaseRollupPlugins(),
			alias({
				entries: {
					hostConfig: path.resolve(pkgPath, 'src/hostConfig.ts')
				}
			}),
			generatePackageJson({
				inputFolder: pkgPath,
				outputFolder: pkgDistPath,
				baseContents: ({ name, description, version }) => ({
					name,
					description,
					version,
					peerDependencies: {
						react: version
					},
					main: 'index.js'
				})
			})
		]
	}
];
