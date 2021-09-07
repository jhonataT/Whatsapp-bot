const OnMsg = require('./OnMessage.ts');

function beginningSection(client: any): void{
    client.onMessage((message: any) => OnMsg(client, message));

}

module.exports = beginningSection;
