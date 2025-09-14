import path from 'path';
import fs from 'fs';
import ts from 'rollup-plugin-typescript2';
import cjs from '@rollup/plugin-commonjs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const pkgPath = path.resolve(__dirname, '../../packages');

const distPath = path.resolve(__dirname, '../../dist/node_modules');

export function resolvePkgPath(pkgName, isDist) {
	if (isDist) {
		return path.resolve(distPath, pkgName);
	}
	return path.resolve(pkgPath, pkgName);
}

export function getPackageJson(pkgName) {
	const pathUrl = path.resolve(resolvePkgPath(pkgName), 'package.json');
	const str = fs.readFileSync(pathUrl, 'utf-8');
	const json = JSON.parse(str);
	return json;
}

export function getBaseRollupPlugins({ typescriptOptions = {} } = {}) {
	return [cjs(), ts(typescriptOptions)];
}
