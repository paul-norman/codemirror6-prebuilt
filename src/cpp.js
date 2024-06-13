import { basicSetup }	from 'codemirror';
import { cpp }			from '@codemirror/lang-cpp';
import { oneDark }		from '@codemirror/theme-one-dark';
import Base				from './_base.js';

// Extensions included this way are always loaded
const extensions = [
	basicSetup, 
	cpp(),
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