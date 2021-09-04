async function imageAsSticker(client: any, message: any, CMD_NAME: string) {
    if(!message.caption) message.caption = 'message'; 

    if(message.type === 'image'){
        if(CMD_NAME === "sticker" || CMD_NAME === "s"){
            message.body  = await client.decryptMedia(message);
            await client.sendImageAsSticker(message.from, message.body);
            console.log('Send sticker');
        }
    }
}

module.exports = imageAsSticker;