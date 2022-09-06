require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");

const port = process.env.HOST_PORT;
const SMTP_CONFIG = require("./src/config/mail");
const app = express();

app.get("/", (req, res) => res.send("Hello World"));

app.get("/send-mail", (req, res) => {
	const transporter = nodemailer.createTransport({
		host: SMTP_CONFIG.host,
		port: SMTP_CONFIG.port,
		secure: false,
		auth: {
			user: SMTP_CONFIG.user,
			pass: SMTP_CONFIG.pass,
		},
		tls: {
			rejectUnauthorized: false,
		},
	});

	async function sendMail() {
		const mail = await transporter.sendMail({
			from: "Felipe Batista <felipeb2silva@gmail.com",
            replyTo: "felipeb2silva@gmail.com",
			to: ["felipeb2silva@gmail.com"],
			subject: "Sem assunto",
			text: "texto de teste",
		})
        .then(data => res.send(data))
        .catch(error => res.send(error));
	}

    sendMail();
});

app.listen(port, () => console.log(`Usando porta:${port}!`));