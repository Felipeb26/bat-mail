require("dotenv").config();
const express = require("express");
const cron = require("./src/config/delete.cron");

const port = process.env.HOST_PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mail = require("./src/routes/mail.routes");
app.use("/mail", mail);

const pdf = require("./src/docs/pdf")
app.use("/pdf",pdf)

app.listen(port, () =>{
    console.log(`Rodando na porta${port}`);
    cron.run();
})