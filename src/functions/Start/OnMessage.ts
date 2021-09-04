const msgSetup = require('./messageSetup');
const GroupMessage = require('../Groups/GroupMessage');
const sendSticker = require('../Commands/imageSticker');

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