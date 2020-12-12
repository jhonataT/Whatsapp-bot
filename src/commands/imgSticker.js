const fs = require('fs');
const mime = require('mime-types');

const imgSticker = async (client, message, number) => {
    client.sendText(message.from, `_*Desculpe, essa função está temporariamente indisponìvel.*_`)
}

module.exports = imgSticker;