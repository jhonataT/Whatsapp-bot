import { newEvent } from "../Commands/event/scheduleEvent";
import { removeEvent } from "../Commands/event/removeEvent";
import { showEvent } from "../Commands/event/showEvent";

export async function groupMsg(client: any, message: any, CMD_NAME: string, ARGS: string[]) {
    console.log('GROUPMESSAGE:');
    console.log(CMD_NAME);
    
    const newArgs = Array.from(
        ARGS
        .toString()
        .replace(/,/g, ' ')
        .split(';')
    );
    
    console.log(newArgs);
    let response = '';

    if(CMD_NAME === 'event'|| CMD_NAME === 'e'){
        response = await newEvent(client, message, newArgs);
    } else if(CMD_NAME === 'rmevent'|| CMD_NAME === 're'){
        response = await removeEvent(message);
    } else if(CMD_NAME === 'showevent'|| CMD_NAME === 'se'){
        response = await showEvent(message, client);
    } 

    await client.sendText(message.from, response);
}