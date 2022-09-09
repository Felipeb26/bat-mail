const router = require("express").Router();
const nodemailer = require("nodemailer");
const SMTP_CONFIG = require("../config/mail.config");

router.post("/", (req, res) => {
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

	const { para, assunto, mensagem } = req.body;

	if ((assunto == null && para == null) || mensagem == null) {
		res.status(400).json({
			message: "necessario informar para quem será enviada mensagem",
		});
		return;
	}

	async function sendMail() {
		await transporter
			.sendMail({
				from: "Felipe Batista <felipeb2silva@gmail.com",
				replyTo: "felipeb2silva@gmail.com",
				to: [para],
				subject: assunto,
				text: mensagem,
				priority: "high",
				date: Date.now(),
			})
			.then(() => {
				res.send({ message: "email enviado para com sucesso" });
			})
			.catch((err) => res.send(err));
	}
	sendMail();
});

module.exports = router;