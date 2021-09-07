const scheduleEvent = require('../Commands/event/scheduleEvent.ts');
const rmEvent = require('../Commands/event/removeEvent.ts');
const showEvt = require('../Commands/event/showEvent.ts');

async function groupMsg(client: any, message: any, CMD_NAME: string, ARGS: string[]) {
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
        response = await scheduleEvent(client, message, newArgs);
    } else if(CMD_NAME === 'rmevent'|| CMD_NAME === 're'){
        response = await rmEvent(message);
    } else if(CMD_NAME === 'showevent'|| CMD_NAME === 'se'){
        response = await showEvt(message, client);
    } 

    await client.sendText(message.from, response);
}

module.exports = groupMsg;