import { User } from "../../../database/controllers";

export async function getAllUsers(): Promise<string> {
    const userExists = await User.findAll();
    let users = '';

    for await (const user of userExists){
        if(user.dataValues.status === 1){
            users += `✔️${user.dataValues?.name.toString()}\n`;
        } else {
            users += `✖️${user.dataValues?.name.toString()}\n`;
        }
    }

    return users;
}