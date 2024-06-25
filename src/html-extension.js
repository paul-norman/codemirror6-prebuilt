import { basicSetup }				from 'codemirror';
import { html }						from '@codemirror/lang-html';
import { oneDark }					from '@codemirror/theme-one-dark';
import Base							from './_base.js';
import { highlightSpinBlocks }		from '../extensions/highlight-spin-blocks.js';
import { highlightTemplateVars }	from '../extensions/highlight-template-vars.js';

// Extensions included this way are always loaded
const extensions = [
	basicSetup,
	html(),
	highlightSpinBlocks(),
	highlightTemplateVars(),
];

// Extensions included this way can be loaded if the relevant option name is passed to the initialisation script with a boolean value - see custom js example file
const options = {
	extensions: {
		dark: oneDark
	}
}

export function load() {
	return new Base(extensions, options);
}