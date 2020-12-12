const ffmpeg = require('ffmpeg');

const gifSticker = async (client, message, number) => {
    message.body  = await client.decryptMedia(message);
    await client.sendMp4AsSticker(message.from, message.body);
    console.log('end');
}

module.exports = gifSticker;