const voting = (msg, index) => {
    const rest = msg.substring(msg.indexOf("#")); 
    const datas = {
        theme: msg.substring(index, msg.indexOf("#")),
        options: rest.split(" "),
    }
    if(datas.theme != undefined && datas.options.length >= 2){
        if(rest.indexOf("#") != -1){
            return datas;
        }
    }
}

module.exports = voting
