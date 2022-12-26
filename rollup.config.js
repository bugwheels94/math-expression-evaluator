import resolve from '@rollup/plugin-node-resolve'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import babel from '@rollup/plugin-babel'

import globby from 'fast-glob'
import path from 'path'
import { terser } from 'rollup-plugin-terser'
const extensions = ['.js', '.jsx', '.ts', '.tsx']
const babelIncludes = ['./src/**/*']
const configs = globby.sync(['./src/**', '!./src/**.json', '!./src/**.css'])
const bundleNpmWorkspacePackages = ['ws']
const bundlePackages = []
const neverBundlePackages = []
const shouldBundleLocalFilesTogether = false
const isDevelopment = !!process.env.ROLLUP_WATCH
const isProduction = !isDevelopment
const isPackageDependency = (pkg, path, importer = '') => {
	return (
		path.includes('node_modules/' + pkg) ||
		(importer.includes('node_modules/' + pkg) && (console.log('???', path, importer), path.startsWith('.'))) ||
		path === pkg
	)
}
const createConfig = (format) => (input) => {
	return {
		input,
		output: {
			file: format
				? path.join('./dist', 'browser', 'math-expression-evaluator.min.js')
				: path.join('./dist', 'es', input.replace('/src', '').replace(/\.(tsx|ts)/, '.js')),
			// dir: path.join('./dist', 'es', entry.split('/')[2]),
			format: format || 'cjs',
			name: format ? 'Mexp' : undefined,
		},
		external(id, second = '') {
			if (format) return false
			const sanitizedId = id.split('?')[0]
			const isNodeModule = id.includes('node_modules')
			if (id.endsWith('.json')) return false
			if (sanitizedId.endsWith(input.replace('./', '/'))) {
				return false
			}
			// No need to pass second because the entry will be stopped
			if (neverBundlePackages.find((pkg) => isPackageDependency(pkg, id))) {
				return true
			}
			if (bundlePackages.find((pkg) => isPackageDependency(pkg, id, second))) {
				return false
			}
			if (
				!id.includes('node_modules') &&
				!second.includes('node_modules') &&
				bundleNpmWorkspacePackages.find((pkg) => id.includes('/' + pkg + '/') || second.includes('/' + pkg + '/'))
			) {
				return false
			}

			if (isNodeModule) {
				return true
			}

			return !shouldBundleLocalFilesTogether
		},
		plugins: [
			resolve({
				extensions,
			}),
			babel({
				extensions,
				include: babelIncludes,
			}),
			peerDepsExternal(),
			terser(),
		],
	}
}
export default [...configs.map(createConfig()), ...globby.sync(['./src/index.ts']).map(createConfig('umd'))]
