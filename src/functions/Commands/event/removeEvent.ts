const eventDataBase = require('../../../database/Event.json');
const fileSystem = require('fs');
const pth = require('path');

async function removeEvent(
    { sender }: any, 
): Promise<string> {
    console.log(eventDataBase.body);

    if(eventDataBase.body === "*") return `
        ${sender.pushname}, não há um evento em andamento.
    `;

    const eventInformation: Infomation = {
        body: '*',
        title: '*',
        hour: '*'
    };

    fileSystem.writeFileSync(
        pth.join(__dirname, '../', '../', '../', './database', 'Event.json'),
        JSON.stringify(eventInformation, null, 4),
        'utf8'
    )

    return 'Tudo certo, evento removido.'; 
}

module.exports = removeEvent;