const venom = require("venom-bot");
const fs = require('fs');
const mime = require('mime-types');

const Database = require("./database/db");
const check = require("./database/datas");
const help = require("./functions/help");
const all = require("./functions/all");
const filt = require("./functions/filters");
const register = require("./database/register");

const mentionedAll = {numbers: undefined};
let tableUsers;

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {

  client.onMessage(async (message) => {
    if (message.isMedia === false && message.isGroupMsg === true) {
      await client.sendSeen(message.from);
      
      msg = message.body.toLowerCase();

      // filter function:

      let phrase = filt(msg, message.sender.pushname);
      console.log(phrase);
      if (phrase != null) client.sendText(message.from, phrase);

      // register members group:

      if(msg.indexOf("!register") != -1){
        const verify = handling(msg, "!register", msg.indexOf("!register"));
        console.log("!register + verify " + verify);
            if(verify === 0){
              console.log("\n\n!register\n\n");
              check(message.from, message.author, message.sender.pushname, 1)
              client.sendText(message.from, `*~${message.sender.pushname}~*, *~VOCÊ FOI REGISTRADO~*`)
          } 
      }

      // "ALL" functions:
      
      else if(msg.indexOf("!all") != -1){
        console.log("ALL:\n");
        const verify = handling(msg, "!all", msg.indexOf("!all"));
        console.log("verify = " + verify)
        if(verify === 0){
          Database.then( async (db) => {
            tableUsers =  await db.all("SELECT * FROM usering");
            all.allConcat(message.from, message.author, tableUsers);
            console.log("Mencionando:");
            await client.sendMentioned(
              message.from,
              `*Chamando todos os cornos:*\n${all.allText}`,
              all.allArray
            );
            all.allText = "";
            all.allArray = [];
          })
        }
      }

      // "HELP" functions:

      else if(msg.indexOf("!help") != -1){
        let verify = handling(msg, "!help", msg.indexOf("!help"));
        console.log("verify = " + verify)
        if(verify === 0){
          console.log("\n\n!help\n\n");
          await client.sendText(message.from, help);
        }
       }
    } 
    // Image to sticker (group and private):
  });
}

function handling(msg, command, value) {
 
  if(msg[value - 1] === ' ' || msg[value + (command.length)] === ' '){
    if(msg[value - 1] === ' ' && msg[value + (command.length)] === ' ') return 0
    else if(msg[value - 1] === ' ' && msg[value + (command.length)] === undefined) return 0;
    else if(msg[value - 1] === undefined && msg[value + (command.length)] === ' ') return 0;
  } else if(msg.length === command.length) return 0;
  return 1;
}
