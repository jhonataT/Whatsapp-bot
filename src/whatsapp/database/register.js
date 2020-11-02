const Database = require("./db.js");

const register = (groupMember, numberMember, nameMember, all_perm = 1) => {
    console.log("\n\nRegistering\n\n");
    Database
        .then( async (db) => {
            // inserir dados na tabela:
            await db.run(`
                INSERT INTO usering (
                    groupId,
                    number,
                    name,
                    all_permictions
                ) VALUES (
                    "${groupMember}",
                    "${numberMember}",
                    "${nameMember}",
                    "${all_perm}"
                    );
            `)
        });
        Database
        .then( async (db, i = 0) => {
            tableUsers =  await db.all("SELECT * FROM usering");
            console.log(tableUsers)
        })
}


module.exports = register;
