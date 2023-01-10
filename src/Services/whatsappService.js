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
          let isResetConnection = false;

          switch(statusSession) {
            case "notLogged": 
              statusLabel = 'Carregando conexão...';
              isResetConnection = false;
              break;
            case "browserClose" || "autocloseCalled" || "qrReadFail" || "serverClose":
              statusLabel = 'Falha ao logar, tente outra conexão.';
              isResetConnection = true;
              break;
            case "deleteToken" || "deviceNotConnected" || "serverWssNotConnected":
              statusLabel = 'Falha ao logar, tente outra conexão.';
              isResetConnection = true;
              break;
            case "qrReadSuccess":
              statusLabel = 'QR Code reconhecido, carregando chats...';
              isResetConnection = false;
              break;
            case "qrReadFail":
              statusLabel = 'Tente ler o QR Code';
              isResetConnection = false;
              break;
            case "desconnectedMobile":
              statusLabel = 'Aparelho desconectado. Tente novamente.';
              isResetConnection = false;
              break;
            case "chatsAvailable":
              statusLabel = 'Carregando chats...';
              isResetConnection = false;
              break;
            case "initBrowser": 
              statusLabel = 'Iniciando conexão...';
              isResetConnection = false;
              break;
            default: 
              statusLabel = 'Carregando...'
              isResetConnection = false;
          }

          socket.emit('status-response', {statusSession, session, statusLabel, isResetConnection})
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