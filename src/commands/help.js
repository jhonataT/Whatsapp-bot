class Commands {
    static help(client, message){
        client.sendText(message.from, helpList());
    }
}

function helpList(){
    return `
🔰 -----[ *MENU BOTLICO* ]----- 🔰

    ♻️ INFO BOT:
       
    ⚜ *GITHUB:* https://bit.ly/b-lico
    ⚜ *AUTHOR:* Jhonata Tenório
    
    ♻️ COMANDOS GERAIS:

    ⚠️ *!help ou !h* -> Informações do bot.
    ⚠️ *!all ou !a* -> Marca todos do grupo.
    ⚠️ *(!sticker ou !s) na imagem* -> Gera uma figurinha.
    
    ♻️ COMANDOS DO COUNTER STRIKE (HLTV):
    
    ⚠️ *!live ou !l* -> Partidas ao vivo.
    ⚠️ *(!team ou !t) <name>* -> Última partida do time.
      
🔰 -----[ *POWERED BY JhN* ]----- 🔰`
}

module.exports = Commands;
