const Database = require("./db");
const register = require("./register")
const datasRegister = {from: undefined, name: undefined, all_permictions: undefined, value_verify: 0};

let tableUsers;
                
function check(from, name, all_permictions){
    datasRegister.from = from;
    datasRegister.name = name;
    datasRegister.all_permictions = all_permictions;

    // Consultar dados na tabela:

    Database
        .then( async (db, i = 0) => {
            tableUsers =  await db.all("SELECT * FROM usering");
            console.log(tableUsers.length)
        })
        .then( (from = datasRegister.from, i = 0) => {
            // Verificar se o usuário já existe:
            while(i < tableUsers.length){
                if(tableUsers[i].number === datasRegister.from){
                    datasRegister.value_verify = 1;
                    break;
                } else datasRegister.value_verify = 0;
                ++i;
            }
        if(datasRegister.value_verify === 0) {
            register(datasRegister.from, datasRegister.name, datasRegister.all_permictions);
        } else console.log("The user already exists");
    })     
}    

module.exports = check;