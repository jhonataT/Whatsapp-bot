import { Infomation } from "../../../interfaces";
import { EventTable } from "../../../database/controllers";

export async function removeEvent(
    { sender, from }: any, 
): Promise<string> {
    const eventExists = await EventTable.findAll();

    if(eventExists.length === 0) return `
        ${sender.pushname}, não há um evento em andamento.
    `;

    if(eventExists[0].dataValues?.userAdmin !== from) return `
        ${sender.pushname}, você não pode remover este evento.
    `;

    await EventTable.destroy({where: {id: eventExists[0].dataValues?.id}});

    return 'Tudo certo, evento removido.'; 
}