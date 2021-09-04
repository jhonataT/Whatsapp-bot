const fs = require('fs');
const eventDB = require('../../database/Event.json');

interface Button {
    id: string, 
    title: string
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

    if(eventDB) return `
        ${sender.pushname}, há um evento em andamento.
    `;

    const buttons: Button[] = [
        {id: '0',  title: 'Marcar presença ("!e sim")'},
        {id: '1',  title: 'Não poderei participar ("!e não")'}
    ];

    const eventInformation: Infomation = {
        body: args[0] || '*',
        title: args[1]|| '*',
        hour: args[2]|| '*'
    };

    const isValidEvent = await eventValidation(eventInformation);

    if(!isValidEvent) {
        return `
            O evento não pode ser marcado, pois
            não segue o formato desejado.
        `;
    }

    fs.writeFileSync(
        __dirname + '../' + 'database' + 'Event.json', 
        JSON.parse(eventInformation.toString()),
        'utf8'
    )

    const isCreatedEvent = await client.sendButtons(
        from, 
        eventInformation.body, 
        buttons, 
        eventInformation.title, 
        eventInformation.hour
    ); 

    return 'a'; 
}

const eventValidation = (eventInformation: Infomation): boolean => {
    let isValid = true;
    
    if(eventInformation.body === '*') isValid = false;
    if(eventInformation.title === '*') isValid = false;
    if(eventInformation.hour === '*') isValid = false;
    
    return isValid;
}

module.exports = newEvent;