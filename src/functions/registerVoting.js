const Database = require("../database/dbVoting.js");

const registerVoting = (info) => { // info.theme && info.options && info.startedBy && info.groupId
    console.log("\n\nRegister voting\n\n");
    Database
    .then( async (db) => {
        // inserir dados na tabela:
        await db.run(`
            INSERT INTO voting (
                theme,
                options,
                startedBy,
                name,
                groupId
            ) VALUES (
                "${info.theme}",
                "${info.options}",
                "${info.startedBy}",
                "${info.name}",
                "${info.groupId}"
                );
        `)
    });
    Database
    .then( async (db) => {
        let tableVoting =  await db.all("SELECT * FROM voting");
        // console.log(tableVoting);
    })
}

module.exports = registerVoting;
