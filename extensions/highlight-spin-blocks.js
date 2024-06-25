import { MatchDecorator, Decoration, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';

/*
HIGHLIGHTS SPIN BLOCKS
e.g. {{option 1 is here|option 2 is here}}
*/

/**
 * Defines a mark decorator.
 */
const highlight = Decoration.mark({
	class: 'cm-html-spin-block'
});

/**
 * Defines basic theme styles for the spin block decorations.
 */
const baseTheme = EditorView.baseTheme({
	'&light .cm-html-spin-block': { color: '#0000ff' },
	'&dark .cm-html-spin-block': { color: '#0000ff' },
});


const spinBlockMatcher = new MatchDecorator({
	regexp: /\{\{(.*?)\}\}/g,
	decoration: highlight,
});

/**
 * Creates a spinBlocks ViewPlugin which advertises that it provides decorations and makes sure its decorations
 * property is recomputed when the document or the viewport changes.
 */
const spinBlocks = ViewPlugin.fromClass(
	class {
		/**
		 * @type {DecorationSet}
		 */
		decorations;

		/**
		 * @param {EditorView} view
		 */
		constructor(view) {
			this.decorations = spinBlockMatcher.createDeco(view);
		}

		/**
		 * @param {ViewUpdate} update
		 */
		update(update) {
			this.decorations = spinBlockMatcher.updateDeco(update, this.decorations);
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
 * Returns a function to install the Highlight Spin Blocks functionality into the editor.
 *
 * @param {object} options
 *
 * @return {Extension}
 */
export function highlightSpinBlocks(options = {}) {
	return [
		baseTheme,
		[],
		spinBlocks
	];
}