require("dotenv").config();

module.exports = {
	host: "smtp.gmail.com",
	port: 587,
	user: "felipeb2silva@gmail.com",
	pass: process.env.SMPT_PASS,
};
