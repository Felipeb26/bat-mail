require("dotenv").config();
const express = require("express");
const cron = require("./src/config/delete.cron");

const port = process.env.HOST_PORT;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mail = require("./src/routes/mail.routes");
app.use("/mail", mail);

app.listen(port, () =>{
    console.log(`Rodando na porta${port}`);
    cron.run();
})
// app.app.listen(port, cron.run(), () => console.log(`Usando porta: ${port}!`));
