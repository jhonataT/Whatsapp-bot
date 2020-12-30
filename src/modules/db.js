require('dotenv').config();
const Sequelize = require('sequelize');
const sequelize = new Sequelize('licointerface', 'root', process.env.MYSQL_PASSWORD, {
    host: "localhost",
    dialect: 'mysql'
})

sequelize.authenticate()
.then( () => {
    console.log('Conect!');
})
.catch( err => {
    console.log('err');
});

class Database {
    //////////////////////////////////////
    // CREATE TABLE:
    static table(){ 
        const Groups = sequelize.define('groupCommandsAndLinks', {
            link: {
                type: Sequelize.STRING
            },
            commands: {
                type: Sequelize.STRING
            },
            groupId: {
                type: Sequelize.STRING
            }
        });
        // Groups.sync( { force: true } ); // Criar / substituir uma table;
        return Groups;
    }
    //////////////////////////////////////
    // VIEW ALL DATAS IN TABLE:
    static async dataTable(){
        const Groups = await this.table();
        const allData = await Groups.findAll(); 
        let links = new Array();
        allData.forEach( data => {
            links.push({ id: data.dataValues.id, link: data.dataValues.link, cmds: data.dataValues.commands, groupId: data.dataValues.groupId });
        })
        return links;
    }
    //////////////////////////////////////
    // ADD DATAS
    static async addItem(linkGroup, cmds, groupId){
        const Grupos = await this.table();
        await Grupos.create({
            link: `${linkGroup}`,
            commands: `${cmds}`,
            groupId: groupId
        });
    }
}

module.exports = Database;

