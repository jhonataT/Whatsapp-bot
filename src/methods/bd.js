const Database = require("../database/db.js");
const DataRegister = require("../database/register.js");

class Data {
    constructor(groupId, memberId, memberName, allPermictions){
        this.groupId = groupId;
        this.memberId = memberId;
        this.memberName = memberName;
        this.allPermictions = allPermictions;
    }

    // Show all users in db:
    async showData(){
        const data = await Database.then( async (db) => {
            let tableUsers = await db.all("SELECT * FROM usering");
            return tableUsers;
        });
        return data;
    }

    // register user
    async register() {
        // Get all users in db:
        const tableUsers = await Database.then( async (db) => {
            let tableUser = await db.all("SELECT * FROM usering");
            return tableUser;
        });

        // Make sure the user is registered:
        let verify = false;

        for(let i = 0; i < tableUsers.length; i++){
            if(tableUsers[i].groupId === this.groupId && tableUsers[i].number === this.memberId){
                verify = true;
                console.log(verify);
                break;
            }
        }
        // Register if verify === false;

        if(!verify){
            await DataRegister(this.groupId, this.memberId, this.memberName, this.allPermictions); 
            return "user has been registered!";
        }
        else return "The user already exists";
    }
} 

module.exports = Data;