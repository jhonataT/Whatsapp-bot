const scheduleEvent = require('../Commands/scheduleEvent');

async function groupMsg(client: any, message: any, CMD_NAME: string, ARGS: string[]) {
    console.log('GROUPMESSAGE:');
    console.log(CMD_NAME);
    console.log(ARGS);
    if(CMD_NAME === 'event'|| CMD_NAME === 'e'){
        // const response = await scheduleEvent(client, message, ARGS);
        // console.log(response);
    }
}

module.exports = groupMsg;