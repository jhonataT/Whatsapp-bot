const db = require("./database/db.js");
const Database = require("./database/db.js");

let tableUsers;
const dataVoting = {number: undefined, groupId: undefined, msg: undefined}

const registerVoting = (msg, userNumber, groupId) => {
    dataVoting.number = userNumber;
    dataVoting.groupId = groupId;
    dataVoting.msg = msg;
    Database
    .then( async (db) => {
        tableUsers =  await db.all("SELECT * FROM usering");
        console.log(tableUsers.length)
        for(let i = 0; i < tableUsers.length; ++i){
            if(tableUsers[i].number === dataVoting.number && tableUsers[i].groupId === dataVoting.groupId){
                
                await db.run(
                    `UPDATE usering
                    SET voted = 1
                    WHERE id = ${tableUsers[i].id}`
                );
                await db.run(
                    `UPDATE usering
                    SET votedIn = ${dataVoting.msg}
                    WHERE id = ${tableUsers[i].id}`
                );

                // close the database connection
                // db.close();
                console.log(tableUsers)
            }
        }
    })
}

module.exports = registerVoting;