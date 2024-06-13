# Pre-built Codemirror 6 Files

Getting started with [CodeMirror 6](https://codemirror.net/) is a confusing process! Many people simply want to plug a single, simple JS file into their website and have it apply the highlighting to a textarea or div. This project is for those people, and provides some basic, pre-built files to do just that. It also provides the base to build custom packages yourself should you wish to.

Building from Bryan Gillespie's [CodeMirror Quickstart](https://github.com/RPGillespie6/codemirror-quickstart), this project adds simpler functions to work with HTML textareas, automatically syncing their values to the codemirror editor's value upon blur and providing placeholder support by default.

## Quickstart

The quickest way to get started is just to grab a copy of the relevant language file from the `dist` folder. For example, the `dist/html.min.js` file will allow you to highlight HTML.

In the `examples` directory there very minimal examples of how to use these files, but in general you might do something like:

```html
<!doctype html>
<html>
	<head>
		<script src="html.min.js"></script>
		<script>
			document.addEventListener('DOMContentLoaded', (event) => {
				let editors = document.querySelectorAll('.codemirror');
		
				if (editors) {
					editors.forEach(function(editor) {
						const options = { dark: true };
						cm6.load().textarea(editor, options);
					});
				}
			});
		</script>
	</head>
	<body>
		<textarea class="codemirror">
			<p>HTML content</p>
		</textarea>
		
		<div class="codemirror">
			<p>More HTML content</p>
		</div>
	</body>
</html>
```

The functions available are:

 - `newState(content, options = {})`
   - Creates a new `EditorState` returns it
   - Options: 
     - Any defined optional extension name (bool), e.g. `dark`
     - `placeholder` (string) - used for empty elements
     - `focus` (dom element) - used to sync the passed element when focus changes
 - `newView(element, state, options = {})`
   - Creates a new `EditorView` and returns it
   - Options: `lineWrapping` (bool)
 - `newEditor(element, content, options = {})`
   - Creates a new `EditorState` and `EditorView` and returns the latter
 - `fromElement(element, options = {})`
   - Convenience function that creates a new editor from the element passed in (including its content). If the element is a textarea, it will be hidden and its contents will be kept in sync with the CodeMirror editor
 - `textarea(element, options = {})`
   - Synonym for the `fromElement()` method, both can be used on either textareas or block elements

## How to create a custom bundle

I've built very basic editors for the main languages offered by CodeMirror. It's likely that you'll want something slightly different. 

The source files are all located in the `src` directory. The `javascript-custom.js` file shows a much more bespoke build. The official [docs](https://codemirror.net/examples/bundle/) showing how to create a bespoke bundle are a little challenging if your life doesn't revolve around Node.js, so to make it easier, I've created a simple build process.

1. Install [Node.js](https://nodejs.org/en/download)
2. Check out this repo to a location of your choice
3. In a terminal *(from that directory)*, run `npm i`
4. Run the build script: `node ./build.js` (or `npm run build`)

This will build every file in the `src` directory into the `dist` directory. Files starting with an underscore (`_`) will be ignored. This process will create an uncompressed and a compressed version, both with their respective sourcemaps and the global variable named `cm6`. This process uses [esbuild](https://esbuild.github.io/) so it's quick enough to build all at once.

If you want to rebuild as you edit / test, you can watch the files and rebuild them on change:

```
node ./build.js watch
// OR
npm run watch
```

## Additional languages

I had a go at building a language mode for Ruby *(updating [this](https://github.com/sgtcoolguy/codemirror-lang-ruby) old repo that will no longer run)*, but I was unsuccessful and the error messages about lexer files were not helpful to me!

If you can successfully build other, useful languages, please let me know and I'll add them in.

## Acknowledgements

This repo was inspired by the code from [Bryan Gillespie's](https://github.com/RPGillespie6/codemirror-quickstart) excellent quickstart guide. 