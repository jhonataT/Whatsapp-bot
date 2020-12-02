const fs = require('fs');
const mime = require('mime-types');

const imgSticker = async (client, message) => {
    const buffer = await client.decryptFile(message);
    const fileName = `./src/imgs/img.${mime.extension(message.mimetype)}`;
    await fs.writeFile(fileName, buffer, async (err) => {
        if(err) throw err;
        else{
            await client
            .sendImageAsSticker(message.from, './src/imgs/img.jpeg')
            .then((result) => {
                console.log('Sending Sticker:'); //return object success
            })
            .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
            });
            await fs.unlink(`./src/imgs/img.${mime.extension(message.mimetype)}`, (err) => {
                if(err) throw err;
                else console.log("unlink file");
            });
        }
    });

    console.log("END");
}

module.exports = imgSticker;