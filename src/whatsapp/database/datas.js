const Database = require("./db");
const register = require("./register")
const datasRegister = {group: undefined, number: undefined, name: undefined, all_permictions: undefined, value_verify: 0};

let tableUsers;
                
function check(from, number, name, all_permictions){
    datasRegister.group = from;
    datasRegister.number = number;
    datasRegister.name = name;
    datasRegister.all_permictions = all_permictions;

    // Consultar dados na tabela:

    Database
        .then( async (db, i = 0) => {
            tableUsers =  await db.all("SELECT * FROM usering");
            console.log(tableUsers.length)
        })
    // Conferir se o number do usuário já está cadastrado
        .then( (group = datasRegister.group, number = datasRegister.number, i = 0) => {
            console.log(tableUsers);
            // Verificar se o usuário já existe:
            while(i < tableUsers.length){
                if(tableUsers[i].number === number && tableUsers[i].groupId === group){
                    datasRegister.value_verify = 1;
                    break;
                } else datasRegister.value_verify = 0;
                ++i;
            }
            console.log("value_verify = " + datasRegister.value_verify);
        if(datasRegister.value_verify === 0) {
            console.log("from (group) = " + datasRegister.group);
            console.log("from (user) = " + datasRegister.number);
            register(datasRegister.group, datasRegister.number, datasRegister.name, datasRegister.all_permictions);
        } else {
            datasRegister.value_verify = 0;
            console.log("The user already exists")
        }
    })     
}    

module.exports = check;
