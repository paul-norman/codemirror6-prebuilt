import { EditorView, placeholder }	from '@codemirror/view';
import { EditorState }				from '@codemirror/state';

export default class Base {
	#extensions = [];
	#options	= {};
	
	constructor(extensions, options = {}) {
		for (const extension of extensions) {
			this.#extensions.push(extension);
		}
		this.#options = options;
	}

	newState(content, options = {}) {
		const extensions = this.#extensions.slice();

		if ('placeholder' in options) {
			extensions.push(placeholder(options.placeholder));
		}

		if ('focus' in options) {
			extensions.push(EditorView.updateListener.of((event) => {
				if (event.focusChanged) {
					options.focus.value = event.view.state.doc.toString();
				}
			}));
		}

		if ('extensions' in this.#options && typeof(this.#options.extensions) === 'object') {
			for (const [name, extension] of Object.entries(this.#options.extensions)) {
				if (name in options && options[name] === true) {
					extensions.push(extension);
				}
			}
		}
		
		return EditorState.create({
			doc:		content,
			extensions:	extensions,
		});
	}

	newView(element, state, options = {}) {
		const viewOptions = {
			lineWrapping: ('lineWrapping' in options) ? options.lineWrapping : true,
		};
		
		return new EditorView(Object.assign({}, viewOptions, {
			parent: element,
			state, 
		}));
	}

	newEditor(element, content, options = {}) {
		const state = this.newState(content, options);
		
		return this.newView(element, state, options);
	}

	fromElement(element, options = {}) {
		if (element.nodeName === 'TEXTAREA') {
			return this.#textarea(element, options);
		}

		const content = element.innerHTML;
		element.innerHTML = '';
		return this.newEditor(element, content, options);
	}

	textarea(element, options = {}) {
		return this.fromElement(element, options);
	}

	#textarea(textarea, options = {}) {
		const placeholder = textarea.getAttribute('placeholder');
		if (placeholder && placeholder.length) {
			options.placeholder = placeholder;
		}

		options.focus = textarea;
		
		const element		= document.createElement('div');
		element.className	= 'codemirror';
		const view			= this.newEditor(element, textarea.value, options);

		textarea.parentNode.insertBefore(element, textarea);
		textarea.style.display = 'none';
		if (textarea.form) {
			textarea.form.addEventListener('submit', () => {
				textarea.value = view.state.doc.toString();
			});
		}

		return view;
	}
}