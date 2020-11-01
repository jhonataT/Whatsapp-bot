const venom = require("venom-bot");

const functions = require("./functions");
const check = require("./database/datas");
const filt = require("./filters");
const voting = require("./voting");
const register = require("./database/register");

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  const isMe = await client.getHostDevice();
  // console.log(isMe);

  client.onMessage(async (message) => {
    if (message.isMedia === false &&  message.isGroupMsg === true) {
      msg = message.body.toLowerCase();

      // register members group:
      if(msg.indexOf("!register") != -1){
        console.log("\n\n!register\n\n");

        check(message.from, message.sender.pushname, 1);

       }

      // first, filter function:

      let phrase = filt(msg, message.sender.pushname);
      if (phrase != null) client.sendText(message.from, phrase);

      // Others functions:
      
      if(msg.indexOf("!all") != -1){
        console.log("ALL: \n");
        for(let i = 0; i < members.length; i++){
          let mentioned = functions.all(members, message.from, i);
          if(mentioned != isMe.wid.user && mentioned != undefined){ // Se for diferente do bot, @menciona.
            client.sendMentioned(message.from, `@${mentioned}`, [mentioned]);            
          }
        }
      }
     
      
    } else {
      // Media to Sticker



    }
  });
}
