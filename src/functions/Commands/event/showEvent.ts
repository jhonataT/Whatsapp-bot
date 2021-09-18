import { Button } from "../../../interfaces";
import { EventTable } from "../../../database/controllers";

export async function showEvent(
    { sender, from }: any,
    client: any 
): Promise<string> {

    const eventExists = await EventTable.findAll();
    
    if(eventExists.length === 0) return `
        ${sender.pushname}, não há um evento em andamento.
    `;
    
    const userButtons: Button[] = [
        {id: '0',  text: '!participar'},
        {id: '1',  text: '!naoparticipar'},
    ];

    const isCreatedEvent = await client.sendButtons(
        from, 
        eventExists[0].dataValues?.body, 
        userButtons, 
        eventExists[0].dataValues?.title, 
        eventExists[0].dataValues?.hour
    );

    return ``;
}