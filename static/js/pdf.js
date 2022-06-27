
const PDFDocument = require('pdfkit');
const fs = require('fs');
alert("bonjour");

// Create a document
const doc = new PDFDocument;

// Pipe its output somewhere, like to a file or HTTP response
// See below for browser usage
doc.pipe(fs.createWriteStream('output.pdf'));

// Embed a font, set the font size, and render some text
doc.fontSize(25)
    .text('Some text with an embedded font!', 100, 100);

// Finalize PDF file
doc.end();