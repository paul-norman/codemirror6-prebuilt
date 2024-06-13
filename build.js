import * as esbuild	from 'esbuild';
import fs from 'fs';

const options = { watch: false };
const args = process.argv.slice(2);
if (args.includes('watch')) {
	options.watch = true;
}

const buildInstructions = [];
fs.readdirSync('./src').forEach(file => {
	if (file.indexOf('_') !== 0) {
		const fileUncompressed = async function() {
			const config = {
				entryPoints:	[`./src/${file}`],
				bundle:			true,
				logLevel:		'info',
				globalName:		'cm6',
				sourcemap:		'external',
				outfile:		`./dist/${file}`,
			};
			
			if (options.watch) {
				let ctx = await esbuild.context(config);
				await ctx.watch();
				console.log(`Watching ${file}...`);
			} else {
				await esbuild.build(config);
			}
		}
		
		const fileMinified = async function() {
			const config = {
				entryPoints:	[`./src/${file}`],
				minify:			true,
				bundle:			true,
				logLevel:		'info',
				globalName:		'cm6',
				sourcemap:		'external',
				outfile:		`./dist/${file.replace('.js', '.min.js')}`,
			};
			
			if (options.watch) {
				let ctx = await esbuild.context(config);
				await ctx.watch();
				console.log(`Watching ${file}...`);
			} else {
				await esbuild.build(config);
			}
		}

		buildInstructions.push(fileUncompressed);
		buildInstructions.push(fileMinified);
	}
});

const run = async function() {
	console.time('⚡ \x1b[32mDone in');

	for (const buildInstruction of buildInstructions) {
		if (options.watch) {
			buildInstruction();
		} else {
			await buildInstruction();
		}
	}

	console.log(`\n⚡ \x1b[32mBuilt: ${buildInstructions.length / 2} languages (${buildInstructions.length * 2} files)\x1b[0m`);
	console.timeEnd('⚡ \x1b[32mDone in');
	console.log('\x1b[0m');
}
run();