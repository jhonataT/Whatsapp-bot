import { EventTable, User } from "../../../database/controllers";
import { UserInformation } from "../../../interfaces";

export async function acceptEvent({from, sender}: any): Promise<string> {
    const eventExists = await EventTable.findAll();
    const userExists = await User.findAll();

    if(eventExists.length === 0) return `
        ${sender.pushname}, não há um evento em andamento.
    `;

    const userInformation: UserInformation = {
        name: sender.pushname,
        status: 0,
        number: from
    };

    let isUserExist = false;
    let userExistId;

    for await (const user of userExists){
        if(user.dataValues?.number === from){
            isUserExist = true;
            userExistId = user.dataValues?.id;
            break;
        }
    }

    if(!isUserExist){
        const createResult = await EventTable.create(userInformation);
    } else {
        const userDb = await User.findByPk(userExistId);
        userDb.status = 1;
        const updateUser = await userDb.save();
    }
    return `
        ${sender.pushname}, sua presença foi confirmada.
    `;
} 