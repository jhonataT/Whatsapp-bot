const scheduleEvent = require('../Commands/scheduleEvent');

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

    if(CMD_NAME === 'event'|| CMD_NAME === 'e'){
        const response = await scheduleEvent(client, message, newArgs);
        await client.sendText(message.from, response);
    }
}

module.exports = groupMsg;