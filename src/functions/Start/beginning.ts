const OnMsg = require('./OnMessage');

function beginningSection(client: any): void{
    client.onMessage((message: any) => OnMsg(client, message));

}

module.exports = beginningSection;
