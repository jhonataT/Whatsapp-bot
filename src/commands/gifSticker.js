const fs = require('fs');
const mime = require('mime-types');
const fileUrl = require('file-url');
const CloudConvert = require('cloudconvert');
const cloudConvert = new CloudConvert('api_key');

class GifToSticker {
    static async convert(client, message, number){
        console.log("IN FUNCTION");
        const buffer = await client.decryptFile(message);
        const fileName = `./src/imgs/gif${number}.${mime.extension(message.mimetype)}`;
        
        await fs.writeFile(fileName, buffer, async err => {
            if(err) throw err;
            const test = fileUrl(`./src/imgs/gif${number}.${mime.extension(message.mimetype)}`);

            console.log(test);
            // let job = await cloudConvert.jobs.create({
            // tasks: {
            //     'import-my-file': {
            //         operation: 'import/url',
            //         url: ``
            //     },
            //     'convert-my-file': {
            //         operation: 'convert',
            //         input: 'import-my-file',
            //         output_format: 'gif',
            //         some_other_option: 'value'
            //     },
            //     'export-my-file': {
            //         operation: 'export/url',
            //         input: 'convert-my-file'
            //     }
            // }
            // });










        })
    }
}

module.exports = GifToSticker;