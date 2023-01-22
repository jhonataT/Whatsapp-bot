export const handlerClientMessage = (messageType: string) => {
  switch (messageType) {
    case "notLogged":
      return { isResetConnection: false, statusLabel: 'Aguardando leitura do QR Code' };
    case "browserClose" || "autocloseCalled" || "qrReadFail" || "serverClose":
      return { isResetConnection: true, statusLabel: 'Falha ao logar, tente outra conexão.' };
    case "deleteToken" || "deviceNotConnected" || "serverWssNotConnected":
      return { isResetConnection: true, statusLabel: 'Falha ao logar, tente outra conexão.' };
    case "qrReadSuccess":
      return { isResetConnection: false, statusLabel: 'QR Code reconhecido, carregando chats...' };
    case "qrReadFail":
      return { isResetConnection: true, statusLabel: 'Tente novamente' };
    case "desconnectedMobile":
      return { isResetConnection: false, statusLabel: 'Aparelho desconectado. Tente novamente.' };
    case "chatsAvailable":
      return { isResetConnection: false, statusLabel: 'Carregando chats...' };
    case "initBrowser":
      return { isResetConnection: false, statusLabel: 'Iniciando conexão...' };
    default:
      return { isResetConnection: false, statusLabel: 'Carregando...' };
  }
}