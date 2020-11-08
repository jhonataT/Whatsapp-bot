const venom = require("venom-bot");
const fs = require('fs');
const mime = require('mime-types');

const help = require("./help");
const Database = require("./database/db");
const check = require("./database/datas");
const filt = require("./filters");
const voting = require("./voting");
const register = require("./database/register");
const registerVoting = require("./registerVoting");

const mentionedAll = {numbers: undefined};
const server = {status: false};
let status_voting = false;
let tableUsers;

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
      if(status_voting === false) clearVotes(); // limpar os votos do banco de dados;
      
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

      // Initing voting function:

      else if(msg.indexOf("!voting") != -1){
        const verify = handling(msg, "!voting", msg.indexOf("!voting"));
        console.log("verify = " + verify)
        console.log("status.voting = " + status_voting)
        if(verify === 0 && status_voting === false){
          const vote = voting(msg, msg.indexOf("!voting") + 8)
          console.log(vote)
          if(vote != undefined){
            status_voting = true;
            let options = " "
            options = options.concat("```VOTAÇÃO:```\n", `\n *tema:* `, vote.theme, `\n\n_opções para votar:_ `);

            for(let i = 0; i < vote.options.length; i++){
              options = options.concat("  \n\n", vote.options[i], ` (${i + 1})`); 
            }

            client.sendText(message.from, options);
          } else console.log("\n\nthere is already a vote\n\n");
        } else if(verify === 0 && status_voting === true) client.sendText(message.from, `_*~HÁ UMA VOTAÇÃO EM ANDAMENTO.~*_`)
      }

      // voting function:

      else if(msg.indexOf("!vote") != -1){
        const verify = handling(msg, "!vote", msg.indexOf("!vote"));
        console.log("verify = " + verify);
        if(verify === 0 &&  status_voting === true){
          Database
          .then( async (db) => {
            tableUsers =  await db.all("SELECT * FROM usering");
            for(let i = 0; i < tableUsers.length; i++){
              if(tableUsers[i].number === message.author && tableUsers[i].groupId === message.from){
                if(tableUsers[i].voted === 1){
                  client.sendText(message.from, `*_${message.sender.pushname}, VOCÊ JÁ VOTOU!!_*`);
                  break;
                } else {
                  console.log("teste " + tableUsers[i].voted);
                  const newMsg = msg.replace("!vote", "");
                  const contVote = registerVoting(newMsg, message.author, message.from);
                  client.sendText(message.from, `*_${message.sender.pushname}, OBRIGADO POR VOTAR!_*`);
                  break;
                }
              }
            }
          });
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

function clearVotes(){
  Database
  .then( async (db) => {
    tableUsers =  await db.all("SELECT * FROM usering");
    console.log("system 'clearVotes'");
    for(let i = 0; i < tableUsers.length; i++){
      if(tableUsers[i].voted != 0){
        await db.run(
          `UPDATE usering
          SET voted = 0
          WHERE id = ${tableUsers[i].id}`
        );
      }
    }
  });
}
