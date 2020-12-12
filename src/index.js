const wa = require('@open-wa/wa-automate');
const all = require('./commands/all');
const Adm = require('./commands/admin');
const hltv = require('./commands/hltv');
const imgSticker = require("./commands/imgSticker");

const PREFIX = '!';
let numberFile = 0;

wa.create({
  qrQuality: 0.5,
  qrFormat: "jpeg"
}).then(client => init(client));

const init = (client) => {
  client.onMessage(async (message) => {
    console.log(message);
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
  const adm = new Adm(client, message, args);

  if(CMD_NAME === 'all' || CMD_NAME === 'a')
    all.mention(client, message);
  if(CMD_NAME === 'adm' || CMD_NAME === 'ad')
    adm.mention();
  if(CMD_NAME === 'promote' && args.length != 0 || CMD_NAME === 'p' && args.length != 0)
    adm.promoteUser();
  if(CMD_NAME === 'denote' && args.length != 0 || CMD_NAME === 'd' && args.length != 0)
    adm.denoteUser();
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
  console.log(message.type);  
  if(message.type === 'image'){
    if(CMD_NAME === "sticker" || CMD_NAME === "s")
      imgSticker(client, message, ++numberFile);
  }
};
