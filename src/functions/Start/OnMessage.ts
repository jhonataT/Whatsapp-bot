const msgSetup = require('./messageSetup.ts');
const GroupMessage = require('../Groups/GroupMessage.ts');
const sendSticker = require('../Commands/imageSticker.ts');

async function OnMessage(client: any, msg: any) {
  await client.sendSeen(msg.from);
  const { PREFIX, CMD_NAME, ARGS } = msgSetup(msg);
  
  if(!msg.body) msg.body = 'nothing here!'; // if message.body is null
  if(!msg.body.startsWith(PREFIX)) return;

  if(msg.isMedia === false && msg.isGroupMsg === true)
    GroupMessage(client, msg, CMD_NAME, ARGS);
  else if(msg.isMedia === true)
    sendSticker(client, msg, CMD_NAME);
}

module.exports = OnMessage;