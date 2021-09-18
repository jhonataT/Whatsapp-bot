import { Button, Infomation } from '../../../interfaces';
import { EventTable, sqlz } from '../../../database/controllers';

export async function newEvent(
    client: any, 
    { from, sender }: any, 
    args: string[]
): Promise<string> {

    // if(eventDB.body !== "*") return `
    //     ${sender.pushname}, há um evento em andamento.
    // `;

    const userButtons: Button[] = [
        {id: '0',  text: '!participar'},
        {id: '1',  text: '!naoparticipar'},
    ];

    const eventInformation: Infomation = {
        title: args[0] || '*',
        body: args[1] || '*',
        hour: args[2] || '*'
    };

    const isValidEvent = await eventValidation(eventInformation);

    if(!isValidEvent) {
        return `
        O evento não pode ser marcado, pois
        não segue o formato desejado.
        `;
    }

    // const db = await sqlz.sync();

    const eventExists = await EventTable.findAll();
    console.log(eventExists.length);

    // const createResult = await EventTable.create(eventInformation);
    // console.log(createResult);

    // const isCreatedEvent = await client.sendButtons(
    //     from, 
    //     eventInformation.body, 
    //     userButtons, 
    //     eventInformation.title, 
    //     eventInformation.hour
    // );

    return 'Tudo certo, evento marcado.'; 
}

const eventValidation = (eventInformation: Infomation): boolean => {
    let isValid = true;
    
    if(eventInformation.body === '*') isValid = false;
    if(eventInformation.title === '*') isValid = false;
    if(eventInformation.hour === '*') isValid = false;
    
    return isValid;
}