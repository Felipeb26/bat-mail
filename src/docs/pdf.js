const app = require("express").Router();
const PDFDocument = require("pdfkit");
const util = require("../utils/random_name")

app.get("/", (req, res) => {
	var pdf = new PDFDocument({
		bufferPages: true,
		compress: true,
	});

	let name = util.randomString(15);
	let buffer = [];
	pdf.on("data", buffer.push.bind(buffer));
	pdf.on("end", () => {
		let data = Buffer.concat(buffer);
		res.writeHead(200, {
			"Content-Length": Buffer.byteLength(data),
			"Content-Type": "application/pdf",
			"Content-disposition": ` attachment;filename=${name}.pdf`,
		}).end(data);
	});
	pdf.text("My Sample PDF Document");
	pdf.end();
});

module.exports = app;