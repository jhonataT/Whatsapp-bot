import { EventTable, User } from "../../../database/controllers";

export async function declineEvent({sender, from}: any): Promise<string> {
    const eventExists = await EventTable.findAll();
    const userExists = await User.findAll();

    if(eventExists.length === 0) return `
        ${sender.pushname}, não há um evento em andamento.
    `;

    let isUserExist = false;
    let userExistId;

    for await (const user of userExists){
        if(user.dataValues?.number === from){
            isUserExist = true;
            userExistId = user.dataValues?.id;
            break;
        }
    }

    if(!isUserExist) return `
    ${sender.pushname}, você não vai participar deste evento.
    `;

    const userDb = await User.findByPk(userExistId);
    userDb.status = 0;
    const updateUser = await userDb.save();
    
    return `
        ${sender.pushname}, você não vai mais participar deste evento.
    `;
}

export async function removeUsers(): Promise<void> {
    const userExists = await User.findAll();
    for await (const user of userExists){
        User.destroy({
            where: {id: user.dataValues?.id}
        });
    }
}