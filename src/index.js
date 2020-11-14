const venom = require("venom-bot");
const { HLTV } = require('hltv')
const fs = require('fs');
const mime = require('mime-types');

const Database = require("./database/db");
const check = require("./database/datas");
const help = require("./functions/help");
const all = require("./functions/all");
const filt = require("./functions/filters");
const register = require("./database/register");

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

       // Show CS:GO camp:
      else if(msg.indexOf("!team") != -1){
        let verify = handling(msg, "!team", msg.indexOf("!team"));
        console.log("verify = " + verify)
        if(verify === 0){
          let teamName = msg.substring(msg.indexOf("!team") + 6);
          console.log("TeamName = " + teamName);

          let sts = HLTV.getResults({startPage:0,endPage:1}).then((res) => {
            for(let i = 0; i < res.length; i++){
              if(res[i].team1.name.toLowerCase() === teamName || res[i].team2.name.toLowerCase() === teamName){
                  console.log(res[i].team1.name + " " + res[i].team2.name);
                  return res[i];
                  break;
              }
            }
          }).then( (sts) => {
            let moreInfos = HLTV.getMatch({id: sts.id}).then( (res) => {
              console.log("More infos");
              return res;
            }).then( (moreInfos) => {
              console.log(sts);
              if(sts != undefined){
                let printInfos = infoCsgoTeams(teamName, sts, moreInfos);
                client.sendText(message.from, printInfos);
              } else client.sendText(message.from, "_*~NÃO HÁ JOGO RECENTE DESTE TIME.~*_")
            })
          });
        }
      }

      // show lives games:

      else if(msg.indexOf("!live") != -1){
        let verify = handling(msg, "!live", msg.indexOf("!live"));
        console.log("verify = " + verify)
        if(verify === 0){
          HLTV.getMatches().then((res) => {
            let livesInfos = "_*jogos acontecendo neste momento:*_\n";
            
            for(let i = 0; i < res.length; i++){
                if(res[i].live === true){
                  console.log("live");
                  livesInfos = livesInfos.concat(`
            *${res[i].team1.name} x ${res[i].team2.name}*\n`)
                livesInfos = livesInfos.concat(`*evento:*\n`) 
                livesInfos = livesInfos.concat(`_${res[i].event.name}_\n`);
                livesInfos = livesInfos.concat(`*formato: ${res[i].format}*\n`);
              }
            }
            if(livesInfos === "_*jogos acontecendo neste momento:*_\n") return `*~NÃO HÁ JOGOS ACONTECENDO NO MOMENTO~*`
            else return livesInfos;
          }).then( (livesInfos) =>{
            client.sendText(message.from, livesInfos);
          })
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

function infoCsgoTeams(teamName, sts, moreInfos) {
  let maps = "*Mapas e seus resultados:*\n";
  for(let i = 0; i < moreInfos.maps.length; i++){
    maps = maps.concat(`
    *${moreInfos.maps[i].name},* 
    *result: ${moreInfos.maps[i].result}*\n
    `);
  }
  
  return `
*SOBRE O ÚLTIMO JOGO DO TIME ${teamName}:*
              
_TIMES:_
_*${sts.team1.name} x ${sts.team2.name}*_

_*Formato: ${moreInfos.format}*_
  
_PLACAR: ${sts.result}_ 

${maps}

_Player da partida:_
*${moreInfos.highlightedPlayer.name}*

_Um highlight:_
${moreInfos.highlights[0].link}


_TORNEIO: ${sts.event.name}_
  `
}
