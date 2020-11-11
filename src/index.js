const venom = require("venom-bot");
const fs = require('fs');
const mime = require('mime-types');

const Database = require("./database/db");
const check = require("./database/datas");
const help = require("./functions/help");
const all = require("./functions/all");
const filt = require("./functions/filters");
const register = require("./database/register");
const registerVoting = require("./functions/registerVoting");

const mentionedAll = {numbers: undefined};
const server = {status: false};
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
            all.allConcat(message.from, message.author, tableUsers);
            console.log("Mencionando:");
            let test;
            let i = -1;
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

        Database.then( async (db) =>{
          let allVotingTable = await db.all("SELECT * FROM voting");
          tableUsers = await db.all("SELECT * FROM usering");
          // console.log(allVotingTable);
          return allVotingTable;
        }).then( (allVotingTable) => {
          console.log(allVotingTable);
          console.log(allVotingTable.length);

          if(verify === 0 && allVotingTable.length === 0){
            if(msg.substring(7, msg.indexOf("#")).length >= 2 && msg.substring(msg.indexOf("#") + 1).length >= 4){
              registerVoting({
                theme: msg.substring(7, msg.indexOf("#")), 
                options: msg.substring(msg.indexOf("#") + 1), 
                startedBy: message.author,
                name: message.sender.pushname, 
                groupId: message.from } )
  
                let options = msg.substring(msg.indexOf("#") + 1).split("#");
                console.log("options : " + options);              
              
                let print = " ";
                print = print.concat("``VOTAÇÃO:```\n", `\n *tema:* `, msg.substring(7, msg.indexOf("#")));
  
                for(let i = 0; i < options.length; i++){
                  print = print.concat(`  \n\n  *#${options[i]} _[ use "!vote ${i + 1}" ]_*`);
                }
  
              client.sendText(message.from, print);
            } else client.sendText(message.from, `_*~SINTAXE ERRADA, TENTE NOVAMENTE!.~*_`) 

          } 
          else if(verify === 0 && msg.length === "!voting".length && allVotingTable.length != 0){
            //Informações sobre a votação atual:
            console.log("SOBRE A VOTAÇÃO ATUAL: ");
            
            let print = " ";
            print = print.concat(
              "|```SOBRE A VOTAÇÃO ATUAL: ```\n|", `
              *_TEMA_*: ${allVotingTable[0].theme}\n|
              *_CRIADA POR:_* 
              ~${allVotingTable[0].name}~\n|
              *_OPÇÕES DE VOTO:_*\n|
              `);
          
            let options = allVotingTable[0].options.split("#");

            for(let j = 0; j < options.length; j++){
              options[j] = options[j].replace(" ", "");
              print = print.concat(`\n|              _*#${options[j]}*_\n|`)
            }

            print = print.concat(`
            *_COMO ESTÃO OS VOTOS:_*\n|
            `)

            for(let j = 0; j < tableUsers.length; j++){
              
              if(tableUsers[j].groupId === message.from){
                if(tableUsers[j].name.indexOf(" ") != -1) tableUsers[j].name =  tableUsers[j].name.substring(0, tableUsers[j].name.indexOf(" "))
                if(tableUsers[j].voted === 0){
                  console.log(tableUsers[j].name + " ainda não votou")
                  
                  print = print.concat(`\n| _*${tableUsers[j].name} AINDA NÃO VOTOU*_\n|`)
                } else {
                  console.log(tableUsers[j].name + " votou")
                  if(tableUsers[j].votedIn <= options.length){
                    // Votaram em uma opção válida.
                    print = print.concat(
                    `\n| _*${tableUsers[j].name} VOTOU NA OPÇÃO:*_ \n\n         _*#${options[tableUsers[j].votedIn - 1]}*_\n|`
                    )

                  }
                }

              }

            }


            client.sendText(message.from, print);




          }
          else client.sendText(message.from, `_*~HÁ UMA VOTAÇÃO EM ANDAMENTO.~*_`);
        })

      }

      // voting function:

      else if(msg.indexOf("!vote") != -1){
        console.log("!vote " + msg.substring(6));
        
        const verify = handling(msg, "!voting", msg.indexOf("!voting"));
        console.log("verify = " + verify)
        let allVotingTable;
        Database.then( async (db) =>{
          
          allVotingTable = await db.all("SELECT * FROM voting");
          tableUsers = await db.all("SELECT * FROM usering");  
          return db;

        }).then( async (db) => {
          
          console.log(allVotingTable);
          console.log(allVotingTable.length);

          if(verify === 0 && allVotingTable.length > 0){
            if(msg.length >= 7){
              let verifyVote = 0; 
              let i = 0;
              
              for(; i < tableUsers.length; i++){
                if(message.author === tableUsers[i].number && message.from === tableUsers[i].groupId){
                  verifyVote = 1;
                  id = tableUsers.id; 
                  break;
                }
              }
              console.log("i = " + i);
  
              if(verifyVote === 1 && tableUsers[i].voted === 0){
                // save vote.
                console.log(`SALVANDO O VOTO DE ${tableUsers[i].name}`);
                await db.run(
                  `UPDATE usering
                  SET voted = 1
                  WHERE id = ${tableUsers[i].id}`
                );
                await db.run(
                  `UPDATE usering
                  SET votedIn = ${msg.substring(6)}
                  WHERE id = ${tableUsers[i].id}`
                );
                client.sendText(message.from,  `_*${message.sender.pushname}, OBRIGADO POR VOTAR!*_`)
                
              } else client.sendText(message.from, `_*${message.sender.pushname}, ~VOCÊ JÁ VOTOU!.~*_`);
  
            } else client.sendText(message.from, `_*~SINTAXE ERRADA.~*_`); 

          } else client.sendText(message.from, `_*~NÃO HÁ UMA VOTAÇÃO EM ANDAMENTO.~*_`);

        });
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
