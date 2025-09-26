# Web Workers

Web Workers allow JavaScript to run in the background, on a separate thread from the browser UI. This is useful for heavy tasks like parsing or validating large files, keeping the interface responsive.

## How It Works

A worker is created with the `Worker` constructor, pointing to a separate JS file. The main thread and worker communicate via `postMessage` and `onmessage`.


## Example: Parsing Excel to JSON in a Worker

**Main thread:**
```js
const worker = new Worker('excel-worker.js');

// Assume 'file' is a File object from an <input type="file">
file.arrayBuffer().then(buffer => {
	worker.postMessage(buffer);
});

worker.onmessage = function(e) {
	const jsonRows = e.data;
	console.log('Parsed rows:', jsonRows);
};
```

**Worker (`excel-worker.js`):**
```js
// You need to include SheetJS (xlsx) in your worker context
self.onmessage = async function(e) {
	const buffer = e.data;
	importScripts('https://cdn.jsdelivr.net/npm/xlsx/dist/xlsx.full.min.js');
	const workbook = XLSX.read(buffer, { type: 'array' });
	const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
	const rows = XLSX.utils.sheet_to_json(firstSheet);
	self.postMessage(rows);
};
```
*This code parses the first sheet of an Excel file and returns the rows as JSON. The UI remains responsive during parsing.*

## Benefits

- Heavy file parsing and validation do not block the browser.
- UI remains responsive, even for large Excel files.
- Validation errors and parsed data are returned asynchronously.

## Limitations

- No direct DOM access in workers.
- Data is transferred via messages.
- Worker code must be in a separate file.

## Summary

Web Workers are ideal for offloading CPU-intensive tasks like Excel file parsing and validation, ensuring a smooth user experience in web applications.