const whatsVenom = require('venom-bot');

class Whatsapp {
  static async newConnection(connectionName = '', socket) {
    whatsVenom.create(
      {
        session: `whats-web-${connectionName}`,
        headless: true,
        logQR: false,
        disableSpins: true,
        disableWelcome: true,
        updatesLog: true,
        catchQR: (base64Qrimg, asciiQR, attempts, urlCode) => {
          socket.emit('start-response', {asciiQR, base64Qrimg, urlCode, attempts})
        },
        statusFind: (statusSession, session) => {
          let statusLabel = 'Carregando, aguarde...';

          switch(statusSession) {
            case "notLogged" || "browserClose" || "autocloseCalled":
              statusLabel = 'Falha ao logar, tente outra conexão.';
              break;
            case "deleteToken" || "deviceNotConnected" || "serverWssNotConnected":
              statusLabel = 'Falha ao logar, tente outra conexão.';
              break;
            case "qrReadSuccess":
              statusLabel = 'QR Code reconhecido, carregando chats...';
              break;
            case "qrReadFail":
              statusLabel = 'Falha ao carregar QR Code. Tente novamente.';
              break;
            case "desconnectedMobile":
              statusLabel = 'Aparelho desconectado. Tente novamente.';
              break;
            case "chatsAvailable":
              statusLabel = 'Carregando chats...';
              break;
            case "initBrowser": 
              statusLabel = 'Iniciando conexão...';
              break;
            default: 
              statusLabel = 'Carregando...'
          }

          socket.emit('status-response', {statusSession, session, statusLabel})
          //return isLogged || notLogged || browserClose || qrReadSuccess || qrReadFail || autocloseCalled || desconnectedMobile || deleteToken || chatsAvailable || deviceNotConnected || serverWssNotConnected || noOpenBrowser || initBrowser || openBrowser || connectBrowserWs || initWhatsapp || erroPageWhatsapp || successPageWhatsapp || waitForLogin || waitChat || successChat
          //Create session wss return "serverClose" case server for close
        }
      }
    )
    .then( client => {
      console.log("Ressult", client);
    })
  }
}

module.exports =  Whatsapp;