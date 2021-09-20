import { Infomation } from "../../../interfaces";
import { EventTable } from "../../../database/controllers";
import { removeUsers } from "../user/decline";

export async function removeEvent(
    { sender, author }: any, 
): Promise<string> {
    const eventExists = await EventTable.findAll();

    if(eventExists.length === 0) return `
        ${sender.pushname}, não há um evento em andamento.
    `;

    if(eventExists[0].dataValues?.userAdmin !== author) return `
        ${sender.pushname}, você não pode remover este evento.
    `;

    await EventTable.destroy({where: {id: eventExists[0].dataValues?.id}});
    await removeUsers();

    return 'Tudo certo, evento removido.'; 
}