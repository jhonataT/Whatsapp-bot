const fs = require('fs');
const path = require('path');
const eventDB = require('../../../database/Event.json');

interface Button {
    id: string, 
    text: string
};

interface Infomation {
    body: string,
    title: string, 
    hour: string
}

async function newEvent(
    client: any, 
    { from, sender }: any, 
    args: string[]
): Promise<string> {

    if(eventDB.body !== "*") return `
        ${sender.pushname}, há um evento em andamento.
    `;

    const userButtons: Button[] = [
        {id: '0',  text: '!participar'},
        {id: '1',  text: '!naoparticipar'},
    ];

    const eventInformation: Infomation = {
        body: args[1] || '*',
        title: args[0] || '*',
        hour: args[2] || '*'
    };

    const isValidEvent = await eventValidation(eventInformation);

    if(!isValidEvent) {
        return `
            O evento não pode ser marcado, pois
            não segue o formato desejado.
        `;
    }

    fs.writeFileSync(
        path.join(__dirname, '../', '../', '../', '/database', 'Event.json'),
        JSON.stringify(eventInformation, null, 4),
        'utf8'
    )

    const isCreatedEvent = await client.sendButtons(
        from, 
        eventInformation.body, 
        userButtons, 
        eventInformation.title, 
        eventInformation.hour
    );

    return 'Tudo certo, evento marcado.'; 
}

const eventValidation = (eventInformation: Infomation): boolean => {
    let isValid = true;
    
    if(eventInformation.body === '*') isValid = false;
    if(eventInformation.title === '*') isValid = false;
    if(eventInformation.hour === '*') isValid = false;
    
    return isValid;
}

module.exports = newEvent;