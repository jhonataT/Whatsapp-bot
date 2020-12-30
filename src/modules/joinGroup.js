const db = require('./db.js');
const axios = require('axios');

async function getLinks() {
    const { data } = await axios(process.env.URL_LICOINTERFACE_API);
    console.log(data);
    return data;
}

async function joinGroup(client) {
    const Groups = await db.table(); // Get table.
    const links = await getLinks(); // Get links by api (licoInterface).

    links.forEach( async data => {
        if(data.groupId == 'false'){

            const allDataBase = await Groups.findAll();
            let linkExistsInDatabase = false; // If link exists in database.
            let newId = await client.joinGroupViaLink(data.link); // Try join to group with whatsapp link.

            allDataBase.forEach( dataDb => { // Verify link in the database.
                if(dataDb.dataValues.link === data.link)
                    linkExistsInDatabase = true;
            });

            if(newId.toString().indexOf('@') != -1 && linkExistsInDatabase === false){
                console.log('Join group!');  
                await db.addItem(data.link, data.commands, newId);
            }
            else { // Delete link
                console.log('Invalid link!');              
            }
        }
    });
}

module.exports = joinGroup;