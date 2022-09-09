const deleteDaily = require("../routes/delete.routes")

class ManagerCron{
    constructor(){
        this.jobs = [deleteDaily]
    }

    run(){
        this.jobs.forEach(job => job.start())
    }
}

module.exports = new ManagerCron()