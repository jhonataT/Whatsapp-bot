const venom = require("venom-bot");

const help = require("./functions/help");
const all = require("./functions/all");
const filt = require("./functions/filters");
const imgSticker = require("./functions/imgSticker");

const hltv = require("./methods/hltv");
const register = require("./database/register");
const data = require("./methods/bd");

const PREFIX = '!';


venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  client.onMessage(async (message) => {
    await client.sendSeen(message.from);
    if (message.isMedia === false && message.isGroupMsg === true) {
      let phrase = await filt(message.body, message.sender.pushname);
      if (phrase) client.sendText(message.from, phrase);
      message.body = message.body.toLowerCase();
      if(message.body.indexOf("kkkk") != -1) client.sendText(message.from, "HUEHUEHUEUHEU");
      if(message.content.startsWith(PREFIX)){ // if the initial message has the PREFIX:
        const db = new data(message.from, message.author, message.sender.pushname, 1);
        const [CMD_NAME, ...args] = message.body
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);


        console.log(CMD_NAME);
        // Register: 
        if(CMD_NAME === 'register'){
          const text = await db.register();
          console.log(text);
          client.sendText(message.from, text);
        }
        //All:
        else if(CMD_NAME === 'all'){
          const tableUsers = await db.showData();
          all.allConcat(message.from, message.author, tableUsers);
          await client.sendMentioned(
            message.from,
            `*Chamando todos os membros:*\n${all.allText}`,
            all.allArray
          );
          all.allText = "";
          all.allArray = [];
        }
        // Help:
        else if(CMD_NAME === 'help'){
          await client.sendText(message.from, help);
        }
        // hltv: team stats.
        else if(CMD_NAME === 'team'){
          let teamName = args.toString().replace(/,/gi, " ");
          console.log(teamName);
          const csgo = new hltv(teamName);
          const stats = await csgo.stats();
          client.sendText(message.from, stats);          
        }
        // hltv: matches live.
        else if(CMD_NAME === 'live' && args.length === 0){
          console.log("A");
          const csgo = new hltv();
          const lives = await csgo.lives();
          client.sendText(message.from, lives);          
        }

        else if(CMD_NAME === 'live' && args.length != 0){
          hltv.liveInfo(args.toString().replace(/,/gi, " "), client, message);


        }
      }
    }
    else{
      message.caption = message.caption.toLowerCase();
        const [CMD_NAME, ...args] = message.caption
        .trim()
        .substring(PREFIX.length)
        .split(/\s+/);
      if(message.type === 'image' && CMD_NAME === "sticker"){
        imgSticker(client, message);
      }
    }
  });
}