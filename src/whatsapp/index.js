const venom = require("venom-bot");
const fs = require('fs');
const mime = require('mime-types');

const help = require("./help");
const Database = require("./database/db");
const check = require("./database/datas");
const filt = require("./filters");
const voting = require("./voting");
const register = require("./database/register");

const mentionedAll = {numbers: undefined};
const server = {status: false};

venom
  .create()
  .then((client) => start(client))
  .catch((erro) => {
    console.log(erro);
  });

async function start(client) {
  const isMe = await client.getHostDevice();
  // Set client status
  await client.setProfileStatus('Online na nave!');
  // Set client profile name
  await client.setProfileName('Lico, o bot!');

  client.onMessage(async (message) => {
    if (message.isMedia === false && message.isGroupMsg === true) {
      
      msg = message.body.toLowerCase();

      // filter function:

      let phrase = filt(msg, message.sender.pushname);
      if (phrase != null) client.sendText(message.from, phrase);

      // register members group:

      if(msg.indexOf("!register") != -1){
        const verify = handling(msg, "!register", msg.indexOf("!register"));
        console.log("!register + verify " + verify);
            if(verify === 0){
              console.log("\n\n!register\n\n");
              console.log(message);
              check(message.from, message.author, message.sender.pushname, 1);
          } 
      }

      // "ALL" functions:
      
      else if(msg.indexOf("!all") != -1){
        console.log("ALL:\n");
        const verify = handling(msg, "!all", msg.indexOf("!all"));
        console.log("verify = " + verify)
        if(verify === 0){
          let tableUsers;
          Database.then( async (db) => {
            tableUsers =  await db.all("SELECT * FROM usering");
            console.log(tableUsers.length);
          }).then( async (from = message.from, number = message.author) => {
            for(let i = 0; i < tableUsers.length; i++){
              if(tableUsers[i].groupId === from && tableUsers[i].number != number){
                console.log("DEVE IMPRIMIR");
                tableUsers[i].number = tableUsers[i].number.replace("@c.us", "");
                await client.sendMentioned(
                    message.from,
                    `@${tableUsers[i].number}`,
                    [tableUsers[i].number]
                  );
                }
            }  
          });
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

       // Change server status
       
       else if(msg.indexOf("!on") != -1){
          console.log("ON");
          const verify = handling(msg, "!on", msg.indexOf("!on"));
          console.log("verify = " + verify)
          if(verify === 0){
            server.status = true;
            client.sendText(message.from, `\n🟢 _*O SERVER TÁ ~ON~*_ 🟢\n`)
          }

       }
       else if(msg.indexOf("!off") != -1){
        console.log("!off");
        const verify = handling(msg, "!off", msg.indexOf("!off"));
        console.log("verify = " + verify)
        if(verify === 0){
          console.log("OFF");
          server.status = false;
          client.sendText(message.from, `\n🔴 _*O SERVER TÁ ~OFF~*_ 🔴\n`)
        }
      }

      // Show server status

      else if(msg.indexOf("!server") != -1){
        console.log("!server");
        const verify = handling(msg, "!server", msg.indexOf("!server"));
        console.log("verify = " + verify)
        if(verify === 0){
          if(server.status ===  false) client.sendText(message.from, `\n🔴 _*O SERVER TÁ ~OFF~*_ 🔴\n`)
          else client.sendText(message.from, `\n🟢 _*O SERVER TÁ ~ON~*_ 🟢\n`);
        }
      }
    } 
    // Image to sticker (group and private)
    else if(message.isMedia === true && message.type === 'image') {
      
      msg = message.caption.toLowerCase();

      if(msg.indexOf('!sticker') != -1){
        const buffer = await client.decryptFile(message);
        // At this point you can do whatever you want with the buffer
        // Most likely you want to write it into a file
        const fileName = `img.${mime.extension(message.mimetype)}`;
        const response = {};
        await fs.writeFile(fileName, buffer, async (err) => {
          if (err){
            console.log("err :"+err);
          } 
          else {
            console.log('Saved!');
            fileSavedFlag = true;
            response.result = fileSavedFlag;
            console.log(response);
            // resolve(response)
            console.log("vem")
            
            // try {
            //   fs.unlinkSync(`img.${mime.extension(message.mimetype)}`)
            //   //file removed
            // } catch(err) {
            //   console.error("erro = " + err);
            // }
            console.log("apaga")
            await client
              .sendImageAsSticker(message.from, `img.jpeg`)
              .then((result) => {
                console.log('Result: ', result); //return object success
              })
              .catch((erro) => {
                console.error('Error when sending: ', erro); //return object error
              });
              console.log("send sticker")
            
          }
        });
      }
    }
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




module.exports = mentionedAll;
