import { basicSetup }	from 'codemirror';
import { angular }		from '@codemirror/lang-angular';
import { cpp }			from '@codemirror/lang-cpp';
import { css }			from '@codemirror/lang-css';
import { go }			from '@codemirror/lang-go';
import { html }			from '@codemirror/lang-html';
import { java }			from '@codemirror/lang-java';
import { javascript }	from '@codemirror/lang-javascript';
import { json }			from '@codemirror/lang-json';
import { less }			from '@codemirror/lang-less';
import { liquid }		from '@codemirror/lang-liquid';
import { markdown }		from '@codemirror/lang-markdown';
import { php }			from '@codemirror/lang-php';
import { python }		from '@codemirror/lang-python';
import { rust }			from '@codemirror/lang-rust';
import { sass }			from '@codemirror/lang-sass';
import { sql }			from '@codemirror/lang-sql';
import { vue }			from '@codemirror/lang-vue';
import { wast }			from '@codemirror/lang-wast';
import { xml }			from '@codemirror/lang-xml';
import { yaml }			from '@codemirror/lang-yaml';
import { oneDark }		from '@codemirror/theme-one-dark';
import Base				from './_base.js';

// Extensions included this way are always loaded
const extensions = [
	basicSetup,
];

// Extensions included this way can be loaded if the relevant option name is passed to the initialisation script with a boolean value - see matching example file
const options = {
	extensions: {
		dark:		oneDark,
		angular:	angular(),
		cpp:		cpp(),
		css:		css(),
		go:			go(),
		html:		html(),
		java:		java(),
		javascript:	javascript(),
		json:		json(),
		less:		less(),
		liquid:		liquid(),
		markdown:	markdown(),
		php:		php(),
		python:		python(),
		rust:		rust(),
		sass:		sass(),
		sql:		sql(),
		vue:		vue(),
		wast:		wast(),
		xml:		xml(),
		yaml:		yaml(),
	}
}

export function load() {
	return new Base(extensions, options);
}