const all = {
    allConcat: (from, number, tableUsers) => {
        for(let i = 0; i < tableUsers.length; i++){
            if(tableUsers[i].groupId === from && tableUsers[i].number != number){
                tableUsers[i].number = tableUsers[i].number.replace("@c.us", "");
                all.allText = all.allText.concat(`@${tableUsers[i].number}\n`) 
                let addAllArray = all.allArray.push(tableUsers[i].number);
            }
        }
    },
    allText: "",
    allArray: []
}

module.exports = all;