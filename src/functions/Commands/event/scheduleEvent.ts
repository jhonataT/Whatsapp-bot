import { Button, Infomation } from '../../../interfaces';
import { EventTable, sqlz } from '../../../database/controllers';
import { acceptEvent } from '../user/accept';

export async function newEvent(
    client: any, 
    { from, sender }: any, 
    args: string[]
    ): Promise<string> {
    let eventExists = await EventTable.findAll();
        
    if(eventExists.length > 0) return `
        ${sender.pushname}, há um evento em andamento.
    `;

    const userButtons: Button[] = [
        {id: '0',  text: '!participar'},
        {id: '1',  text: '!naoparticipar'},
    ];

    const eventInformation: Infomation = {
        title: args[0] || '*',
        body: args[1] || '*',
        hour: args[2] || '*',
        userAdmin: from
    };

    const isValidEvent = await eventValidation(eventInformation);

    if(!isValidEvent) {
        return `
        O evento não pode ser marcado, pois
        não segue o formato desejado.
        `;
    }

    const createResult = await EventTable.create(eventInformation);

    eventExists = await EventTable.findAll();
    if(eventExists.length === 1){
        const isCreatedEvent = await client.sendButtons(
            from, 
            eventInformation.body, 
            userButtons, 
            eventInformation.title, 
            eventInformation.hour
        );
        return await acceptEvent({sender, from}); 
    } else {
        return 'Oopss, não consegui marcar este evento.'; 
    }

}

const eventValidation = (eventInformation: Infomation): boolean => {
    let isValid = true;
    
    if(eventInformation.body === '*') isValid = false;
    if(eventInformation.title === '*') isValid = false;
    if(eventInformation.hour === '*') isValid = false;
    
    return isValid;
}