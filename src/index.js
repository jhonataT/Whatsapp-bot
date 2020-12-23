const wa = require('@open-wa/wa-automate');
const join = require('./modules/joinGroup');
const all = require('./commands/all');
const bd= require('./modules/bd');
const IsOnline = require('./commands/isOnline');
const Adm = require('./commands/admin');
const hltv = require('./commands/hltv');
const imgSticker = require("./commands/imgSticker");

const PREFIX = '!';
let numberFile = 0, timeRestart = false;

wa.create({ authTimeout: 120 }).then(client => init(client));

const init = async (client) => {
  setInterval( () => {
    console.log('LOOKING FOR A NEW GROUP!')
    join(client);
  }, 180000);

  client.onMessage(async (message) => {
    await client.sendSeen(message.from);
    if(message.isMedia === false && message.isGroupMsg === true)
      GroupsMessage(client, message);
    else if(message.isMedia === true)
      sendSticker(client, message);
  });
} 

const GroupsMessage = async (client, message) => {
  if(!message.body) message.body = 'nothing here!'; // if message.body is null
  if(!message.body.startsWith(PREFIX)) return;

  const [CMD_NAME, ...args] = message.body
  .toLowerCase()
  .trim()
  .substring(PREFIX.length)
  .split(/\s+/);

  const links = await bd.dataTable();
  links.forEach( data => {
    if(data.groupId === message.from){
      data.cmds = data.cmds.toLowerCase();
      console.log(`${message.sender.pushname}: ${CMD_NAME}`);
      console.table(data);
      const adm = new Adm(client, message, args);
      
      if(CMD_NAME === 'help' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 'h' && data.cmds.indexOf(CMD_NAME) != -1 )
        all.help(client, message);
      if(CMD_NAME === 'all' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 'a' && data.cmds.indexOf(CMD_NAME) != -1)
        all.mention(client, message);
      if(CMD_NAME === 'online' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 'on' && data.cmds.indexOf(CMD_NAME) != -1)
        IsOnline.on(client, message);
      if(CMD_NAME === 'adm' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 'ad' && data.cmds.indexOf(CMD_NAME) != -1)
        adm.mention();
      if(CMD_NAME === 'live' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 'l' && data.cmds.indexOf(CMD_NAME) != -1)
        hltv.live(client, message);
      if(args.length != 0) {
        if(CMD_NAME === 'promote' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 'p' && data.cmds.indexOf(CMD_NAME) != -1)
          adm.promoteUser();
        if(CMD_NAME === 'denote' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 'd' && data.cmds.indexOf(CMD_NAME) != -1)
          adm.denoteUser();
        if(CMD_NAME === 'team' && data.cmds.indexOf(CMD_NAME) != -1 || CMD_NAME === 't' && data.cmds.indexOf(CMD_NAME) != -1)
          hltv.liveInfo(client, message, args.toString().replace(/,/gi, " "));
        else console.log('Grupo não pode usar esse comando!');
      }
      else console.log('Grupo não pode usar esse comando!');
    }
  });
};

const sendSticker = (client, message) => {
  if(!message.caption) message.caption = 'message'; 
  const [CMD_NAME, ...args] = message.caption
  .toLowerCase()
  .trim()
  .substring(PREFIX.length)
  .split(/\s+/);
  console.log(`${message.sender.pushname}: ${CMD_NAME}`);
  if(message.type === 'image'){
    if(CMD_NAME === "sticker" || CMD_NAME === "s")
      imgSticker(client, message, ++numberFile);
  }
};