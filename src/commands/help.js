class Commands {
    static help(client, message){
        client.sendText(message.from, helpList());
    }
}

function helpList(){
return `
*Command list:*

_To mention all members, use:_
    *!all*
_To get the list of commands, use:_
    *!help*
_To convert an image into a sticker:_
    _I. Send an image;_
    _II. In the text of the image, write *!sticker*;_
    _III. Ready, you have a new sticker._
`;
}


module.exports = Commands;