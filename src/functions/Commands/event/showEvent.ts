const infoDB = require('../../../database/Event.json');

export async function showEvent(
    { sender, from }: any,
    client: any 
): Promise<string> {

    if(infoDB.body === "*") return `
        ${sender.pushname}, não há um evento em andamento.
    `;

    const userButtons: object[] = [
        {id: '0',  text: '!participar'},
        {id: '1',  text: '!naoparticipar'},
    ];

    const isCreatedEvent = await client.sendButtons(
        from, 
        infoDB.body, 
        userButtons, 
        infoDB.title, 
        infoDB.hour
    );

    return ``;
}