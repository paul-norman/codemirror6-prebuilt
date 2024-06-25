import { Decoration, EditorView, ViewPlugin, ViewUpdate } from '@codemirror/view';
import { Facet, RangeSetBuilder } from '@codemirror/state';

/*
HIGHLIGHTS CERTAIN LINES ACCORDING TO A SPACING RULE (EXAMPLE EXTENSION)
*/

/**
 * Defines a line decorator.
 */
const stripe = Decoration.line({
	attributes: { class: 'cm-zebraStripe' }
});

/**
 * Defines basic theme styles for the line decorations.
 */
const baseTheme = EditorView.baseTheme({
	'&light .cm-zebraStripe': { backgroundColor: '#d4fafa' },
	'&dark .cm-zebraStripe': { backgroundColor: '#1a2727' },
});

/**
 * Defines a facet to hold how far apart the line colours should be.
 */
const stepSize = Facet.define({
	combine: values => values.length ? Math.min(...values) : 2
});

/**
 * Helper function to calculate which lines will the striped
 * @param {EditorView} view
 */
function createStripes(view) {
	let step	= view.state.facet(stepSize);
	let builder	= new RangeSetBuilder();

	for (let { from, to } of view.visibleRanges) {
		for (let pos = from; pos <= to;) {
			let line = view.state.doc.lineAt(pos);
			if ((line.number % step) === 0) {
				builder.add(line.from, line.from, stripe);
			}
			pos = line.to + 1;
		}
	}

	return builder.finish();
}

/**
 * Creates a showStripes ViewPlugin which advertises that it provides decorations and makes sure its decorations
 * property is recomputed when the document or the viewport changes.
 */
const showStripes = ViewPlugin.fromClass(
	class {
		/**
		 * @type {DecorationSet}
		 */
		decorations;

		/**
		 * @param {EditorView} view
		 */
		constructor(view) {
			this.decorations = createStripes(view);
		}

		/**
		 * @param {ViewUpdate} update
		 */
		update(update) {
			if (update.docChanged || update.viewportChanged) {
				this.decorations = createStripes(update.view);
			}
		}
	},
	{
		decorations: instance => instance.decorations
	}
);

/**
 * Returns a function to install the Zebra Stripes functionality into the editor.
 *
 * @param {object} options { step?: number }
 *
 * @return {Extension}
 */
export function zebraStripes(options = {}) {
	return [
		baseTheme,
		options.step == null ? [] : stepSize.of(options.step),
		showStripes
	];
}