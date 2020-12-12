const fs = require('fs');
const mime = require('mime-types');

const imgSticker = async (client, message, number) => {
    message.body  = await client.decryptMedia(message);
    await client.sendImageAsSticker(message.from, message.body);
    console.log('end');
}

module.exports = imgSticker;