const venom = require('venom-bot');
const all = require('./commands/all');
const hltv = require('./commands/hltv');
const imgSticker = require("./commands/imgSticker");

const PREFIX = '!';

venom
.create()
.then( (client) => init(client))
.catch( (err) => console.log(err));

const init = (client) => {
  client.onMessage(async (message) => {
    await client.sendSeen(message.from);
    if(message.isMedia === false && message.isGroupMsg === true)
      GroupsMessage(client, message);
    else if(message.isMedia === true)
      sendSticker(client, message);
  });
} 

const GroupsMessage = async (client, message) => {
  if(!message.body.startsWith(PREFIX)) return;
  
  const [CMD_NAME, ...args] = message.body
  .toLowerCase()
  .trim()
  .substring(PREFIX.length)
  .split(/\s+/);
  
  console.log(CMD_NAME);


  if(CMD_NAME === 'all' || CMD_NAME === 'a')
    all.mention(client, message);
  if(CMD_NAME === 'help' || CMD_NAME === 'h')
    all.help(client, message);
  if(CMD_NAME === 'live' && args.length === 0 || CMD_NAME === 'l' && args.length === 0)
    hltv.live(client, message);
  if(CMD_NAME === 'team' && args.length != 0 || CMD_NAME === 't' && args.length != 0)
    hltv.liveInfo(client, message, args.toString().replace(/,/gi, " "));
};

const sendSticker = (client, message) => {
  if(!message.caption) message.caption = 'message'; 
  const [CMD_NAME, ...args] = message.caption
  .toLowerCase()
  .trim()
  .substring(PREFIX.length)
  .split(/\s+/);
  if(message.type === 'image'){
    if(CMD_NAME === "sticker" || CMD_NAME === "s")
      imgSticker(client, message);
  }
};

