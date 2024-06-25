import { MatchDecorator, Decoration, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';

/*
HIGHLIGHTS SIMPLE TEMPLATE VARIABLES
e.g. {var1}
*/

/**
 * Defines a mark decorator.
 */
const highlight = Decoration.mark({
	class: 'cm-html-var'
});

/**
 * Defines basic theme styles for the line decorations.
 */
const baseTheme = EditorView.baseTheme({
	'&light .cm-html-var': { color: '#ff0000', fontWeight: 600 },
	'&dark .cm-html-var': { color: '#ff0000', fontWeight: 600 },
	'&light .cm-html-var .cm-html-spin-block': { color: '#ff0000', fontWeight: 600 },
	'&dark .cm-html-var .cm-html-spin-block': { color: '#ff0000', fontWeight: 600 },
});


const templateVarsMatcher = new MatchDecorator({
	regexp: /\{(\w+)\}/g,
	decoration: highlight,
});

/**
 * Creates a templateVars ViewPlugin which advertises that it provides decorations and makes sure its decorations
 * property is recomputed when the document or the viewport changes.
 */
const templateVars = ViewPlugin.fromClass(
	class {
		/**
		 * @type {DecorationSet}
		 */
		decorations;

		/**
		 * @param {EditorView} view
		 */
		constructor(view) {
			this.decorations = templateVarsMatcher.createDeco(view);
		}

		/**
		 * @param {ViewUpdate} update
		 */
		update(update) {
			this.decorations = templateVarsMatcher.updateDeco(update, this.decorations);
		}
	},
	{
		decorations: instance => instance.decorations,
		/*provide: plugin => EditorView.atomicRanges.of(view => {
			return view.plugin(plugin)?.decorations || Decoration.none;
		}),*/
	}
);

/**
 * Returns a function to install the Highlight Template Vars functionality into the editor.
 *
 * @param {object} options
 *
 * @return {Extension}
 */
export function highlightTemplateVars(options = {}) {
	return [
		baseTheme,
		[],
		templateVars
	];
}