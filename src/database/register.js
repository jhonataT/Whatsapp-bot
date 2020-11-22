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
                    voted, 
                    votedIn,
                    all_permictions
                ) VALUES (
                    "${groupMember}",
                    "${numberMember}",
                    "${nameMember}",
                    0,
                    "0",
                    "${all_perm}"
                    );
            `)
        });
}


module.exports = register;
