import { EventTable, User } from "../../../database/controllers";
import { UserInformation } from "../../../interfaces";

export async function acceptEvent(msg: any): Promise<string> {
    const eventExists = await EventTable.findAll();
    const userExists = await User.findAll();
    console.log(msg);

    if(eventExists.length === 0) return `
        ${msg.sender.pushname}, não há um evento em andamento.
    `;

    const userInformation: UserInformation = {
        name: msg.sender.pushname,
        status: 1,
        number: msg.author
    };

    let isUserExist = false;
    let userExistId;

    for await (const user of userExists){
        if(user.dataValues?.number === msg.author){
            isUserExist = true;
            userExistId = user.dataValues?.id;
            break;
        }
    }
    console.log(isUserExist);
    console.table(userInformation);

    if(!isUserExist){
        const createResult = await User.create(userInformation);
    } else {
        const userDb = await User.findByPk(userExistId);
        userDb.status = 1;
        const updateUser = await userDb.save();
    }
    isUserExist = false;

    return `
        ${msg.sender.pushname}, sua presença foi confirmada.
    `;
} 