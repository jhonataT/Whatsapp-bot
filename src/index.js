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
  client.onMessage((message) => {
    if(message.isMedia === false && message.isGroupMsg === true)
      GroupsMessage(client, message);
    else
      sendSticker(client, message);

    
    
  });
} 

const GroupsMessage = (client, message) => {
  if(!message.body.startsWith(PREFIX)) return;

  const [CMD_NAME, ...args] = message.body
  .toLowerCase()
  .trim()
  .substring(PREFIX.length)
  .split(/\s+/);

  if(CMD_NAME === 'all')
    all.mention(client, message);
  if(CMD_NAME === 'help')
    all.help(client, message);
  if(CMD_NAME === 'live' && args.length === 0)
    hltv.live(client, message);
  if(CMD_NAME === 'live' && args.length != 0)
    hltv.liveInfo(client, message, args.toString().replace(/,/gi, " "));
  if(CMD_NAME === 'team')
    hltv.teamStats(client, message, args.toString().replace(/,/gi, " "));
};

const sendSticker = (client, message) => {
  const [CMD_NAME, ...args] = message.caption
  .toLowerCase()
  .trim()
  .substring(PREFIX.length)
  .split(/\s+/);
  if(message.type === 'image' && CMD_NAME === "sticker"){
    imgSticker(client, message);
  }


};