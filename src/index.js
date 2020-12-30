const wa = require('@open-wa/wa-automate');
const join = require('./modules/joinGroup');
const all = require('./commands/all');
const db = require('./modules/db');
const IsOnline = require('./commands/isOnline');
const Adm = require('./commands/admin');
const hltv = require('./commands/hltv');
const imgSticker = require("./commands/imgSticker");

const PREFIX = '!';
let numberFile = 0, timeRestart = false;

wa.create({ authTimeout: 120 }).then(client => init(client));

const init = async (client) => {
  setInterval( async () => {
    console.log('LOOKING FOR A NEW GROUP!')
    await join(client);
    console.log('All ok!!')
    await client.sendText(process.env.ADM_NUMBER, 'All ok!');
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

  const links = await db.dataTable();

  links.forEach( data => {
    if(data.groupId === message.from){
      data.cmds = data.cmds.toLowerCase();
      console.log(`${message.sender.pushname}: ${CMD_NAME}`);
      console.table(data);
      const adm = new Adm(client, message, args);
        if(data.cmds.indexOf(CMD_NAME) != -1){
          if(CMD_NAME === 'help'|| CMD_NAME === 'h')
            all.help(client, message);
          if(CMD_NAME === 'all' || CMD_NAME === 'a')
            all.mention(client, message);
          if(CMD_NAME === 'online' || CMD_NAME === 'on')
            IsOnline.on(client, message);
          if(CMD_NAME === 'adm' || CMD_NAME === 'ad')
            adm.mention();
          if(CMD_NAME === 'live' || CMD_NAME === 'l')
            hltv.live(client, message);
          if(args.length != 0) {
            if(CMD_NAME === 'promote' || CMD_NAME === 'p')
              adm.promoteUser();
            if(CMD_NAME === 'denote' || CMD_NAME === 'd')
              adm.denoteUser();
            if(CMD_NAME === 'team' || CMD_NAME === 't')
              hltv.liveInfo(client, message, args.toString().replace(/,/gi, " "));
          }
        }
        else console.log(`${data.groupId} não tem permissão para usar o comando: ${CMD_NAME}`);
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
    console.log(CMD_NAME);
    if(CMD_NAME === "sticker" || CMD_NAME === "s")
      imgSticker(client, message, ++numberFile);
  }
};