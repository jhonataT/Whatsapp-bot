const { HLTV } = require('hltv');

class csgo {
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

module.exports = csgo;