class Commands {
    static help(client, message){
        client.sendText(message.from, helpList());
    }
}

function helpList(){
    return `
🔰 -----[ *MENU LICO* ]----- 🔰

    ♻️ INFO LICO, O BOT:
       
    ⚜ *GITHUB:* https://bit.ly/b-lico
    ⚜ *AUTHOR:* Jhonata Tenório
    
    ♻️ COMANDOS GERAIS:

    ⚠️ *!help ou !h* -> Informações do bot.
    ⚠️ *!adm ou !ad* -> Marca todos os admins do grupo.
    ⚠️ *!all ou !a* -> Marca todos do grupo.
    ⚠️ *!online ou !on* -> Mostra quem está online no momento.
    ⚠️ *(!sticker ou !s) na imagem* -> Gera uma figurinha.

    ♻️ COMANDOS ADMINISTRATIVOS:

    ⚠️ *(!promote ou !p) + @member* -> Promover um mebro do grupo.
    ⚠️ *(!denote ou !d) + @member* -> Rebaixar um mebro do grupo.
    
    ♻️ COMANDOS DO COUNTER STRIKE (HLTV):
    
    ⚠️ *!live ou !l* -> Partidas ao vivo.
    ⚠️ *(!team ou !t) <name>* -> Última partida do time.
      
🔰 -----[ *POWERED BY JhN* ]----- 🔰`
}

module.exports = Commands;
