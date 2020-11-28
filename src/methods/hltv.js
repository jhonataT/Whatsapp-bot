const { HLTV } = require('hltv');

class Csgo {
    constructor(teamName){
        this.teamName = teamName;
    }

    async stats(){
        let sts = await HLTV.getResults({startPage:0,endPage:1}).then((res) => {
            for(let i = 0; i < res.length; i++){
                if(res[i].team1.name.toLowerCase() === this.teamName || res[i].team2.name.toLowerCase() === this.teamName){
                    return res[i];
                    break;
                }
            }
        });
        if(sts) return infoCsgoTeams(this.teamName, sts);
        else return "I haven't found a recent match for this team."
    }

    async lives() {
        const infos = await HLTV.getMatches().then((res) => {
            let livesInfos = "_*jogos acontecendo neste momento:*_\n";
            
            for(let i = 0; i < res.length; i++){
                if(res[i].live === true){
                    console.log(res[i]);
                  livesInfos = livesInfos.concat(`
            *${res[i].team1.name} x ${res[i].team2.name}*\n`);
            
                livesInfos = livesInfos.concat(`*evento:*\n`) 
                livesInfos = livesInfos.concat(`_${res[i].event.name}_\n`);
                livesInfos = livesInfos.concat(`*formato: ${res[i].format}*\n`);
              }
            }
            if(livesInfos === "_*jogos acontecendo neste momento:*_\n") 
                return `*~NÃO HÁ JOGOS ACONTECENDO NO MOMENTO~*`
            else 
                return livesInfos;
          });
          return infos;
    }

    static async liveInfo(teamName, client, message){
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
        }     
        if(live === false) client.sendText(message.from, 'Desculpe, não encontrei um jogo ao vivo desse time.')
    }
}


async function infoCsgoTeams(teamName, sts) {
    const moreInfos = await HLTV.getMatch({id: sts.id});
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

module.exports = Csgo;