const banco = require("./banco");

const functions = {
    registerUser: (members, i = 0) => {
        // Cadastrar todos os membros do grupo.
        while(i < members.length){
            if(banco[members[i]._serialized]) return ;
            else{
                banco[members[i]._serialized] = {
                    name: undefined,
                    all: true,
                }
            }
            ++i;
        }
    },
    serverStatus: (action = false, stage = 0) => {
        
        if(stage === 0) {
            if(action === false) functions.status = "OFFLINE";
            else functions.status = "ONLINE"
        } else {
            return functions.status;
        }

    },
    status: "OFFLINE",

    all: (members, from, i) => {
        
        if(from.indexOf(members[i].user) === -1){
            return members[i].user;
        }
    }

}

module.exports = functions;