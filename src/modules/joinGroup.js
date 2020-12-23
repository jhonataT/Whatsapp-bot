const db = require('./db.js');

async function getLinks() {
    const links = await db.dataTable();
    return links;
}

async function joinGroup(client) {
    const Groups = await db.table();
    const links = await getLinks();
    console.table(links);
    links.forEach( async data => {
        if(data.groupId == 'false'){
            const newId = await client.joinGroupViaLink(data.link);
            if(newId.toString().indexOf('@') != -1){
                Groups.update(
                    { groupId: newId },
                    { where: { id: data.id } }
                )
                .then( () => console.log(`New group link!`))
                .catch( err => {
                    console.log(err)
                })
            }
            else { // Delete link
                Groups.destroy({
                    where: {
                        id: data.id 
                    }
                })                
            }
        }
    });
}

module.exports = joinGroup;