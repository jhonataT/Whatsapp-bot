import { Infomation } from "../../../interfaces";
import { EventTable } from "../../../database/controllers";

export async function removeEvent(
    { sender }: any, 
): Promise<string> {
    const eventExists = await EventTable.findAll();

    if(eventExists.length === 0) return `
        ${sender.pushname}, não há um evento em andamento.
    `;

    await EventTable.destroy({where: {id: eventExists[0].dataValues?.id}});

    return 'Tudo certo, evento removido.'; 
}