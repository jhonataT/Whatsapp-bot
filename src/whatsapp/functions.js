
const functions = {
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
