const timer = require("node-cron");
const routes = require("express").Router();

function deleteByUse(){
    console.log("teste de crron")
}

module.exports = timer.schedule("0 0 12 1/1 * *",deleteByUse,{
    scheduled: false
})