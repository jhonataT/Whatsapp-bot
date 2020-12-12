const { HLTV } = require('hltv');

class Csgo {
    static  async teamStats(client, message, teamName){
        let sts = await HLTV.getResults({startPage:0,endPage:1}).then((res) => {
            for(let i = 0; i < res.length; i++){
                if(res[i].team1.name.toLowerCase() === teamName || res[i].team2.name.toLowerCase() === teamName){
                    return res[i];
                    break;
                }
            }
        });
        if(sts) infoCsgoTeams(teamName, sts, client, message);
        else client.sendText(message.from, "I haven't found a recent match for this team.");
    }

    static async live(client, message) {
        const infos = await HLTV.getMatches().then((res) => {
            let livesInfos = "_*jogos acontecendo neste momento:*_\n";
            
            for(let i = 0; i < res.length; i++){
                if(res[i].live === true){
                  livesInfos = livesInfos.concat(`
            *${res[i].team1.name} x ${res[i].team2.name}*\n`);
            
                livesInfos = livesInfos.concat(`*evento:*\n`) 
                livesInfos = livesInfos.concat(`_${res[i].event.name}_\n`);
                livesInfos = livesInfos.concat(`*formato: ${res[i].format}*\n`);
              }
            }
            if(livesInfos === "_*jogos acontecendo neste momento:*_\n") 
                client.sendText(message.from, `*~NÃO HÁ JOGOS ACONTECENDO NO MOMENTO~*`);
            else 
                client.sendText(message.from, livesInfos);
          });
    }

    static async liveInfo(client, message, teamName){
        const infos = await HLTV.getMatches();
        let live = false;
        for(let i = 0; i < infos.length; i++){
            if(infos[i].live === true){
                if(infos[i].team1.name.toLocaleLowerCase() === teamName || infos[i].team2.name.toLocaleLowerCase() === teamName){
                    live = true;
                    const matchInfo = await HLTV.getMatch( {id: infos[i].id} );
                    console.log(matchInfo);
                    let hightLights;
                    if(matchInfo.highlights.length === 0) hightLights = `*Ainda não temos um highlight pronto.*`
                    else hightLights = matchInfo.highlights[0].link;
                    client.sendText(message.from, `
*SOBRE O JOGO DO/DA ${teamName}:*
*status:* _${matchInfo.status}_

    _*${matchInfo.team1.name} X ${matchInfo.team2.name}*_
    
*Formato:* _${matchInfo.format}._

*Evento:*

_${matchInfo.event.name}._

*Mapas:*

*${matchInfo.maps[0].name}:*
*_${matchInfo.maps[0].result}_*

*${matchInfo.maps[1].name}:*
*_${matchInfo.maps[1].result}_*

*${matchInfo.maps[2].name}:*
*_${matchInfo.maps[2].result}_*


*Highlight para você:*

${hightLights}
                    
                    `);
                }
            }
            else this.teamStats(client, message, teamName);
        }     
    }
}


async function infoCsgoTeams(teamName, sts, client, message) {
    const moreInfos = await HLTV.getMatch({id: sts.id});
    let maps = "*Mapas e seus resultados:*\n";
    for(let i = 0; i < moreInfos.maps.length; i++){
      maps = maps.concat(`
      *${moreInfos.maps[i].name},* 
      *result: ${moreInfos.maps[i].result}*\n
      `);
    }
    
    client.sendText(message.from,`
  *SOBRE O ÚLTIMO JOGO DO TIME ${teamName}:*
                
  _TIMES:_
  _*${sts.team1.name} x ${sts.team2.name}*_
  
  _*Formato: ${moreInfos.format}*_
    
  _PLACAR: ${sts.result}_ 
  
  ${maps}
  
  _Player da partida:_
  *${moreInfos.highlightedPlayer.name}*
  
  
  _TORNEIO: ${sts.event.name}_

    `);
  }

module.exports = Csgo;