import { Socket } from "socket.io";
import { handlerClientMessage } from "../utils/handlerClientMsg";

const whatsVenom = require('venom-bot'); 

interface ClientMessage {
  statusLabel: string,
  isResetConnection: boolean
}

export class Whatsapp {
  async newConnection(connectionName = '', socket: Socket): Promise<any> {
    return await whatsVenom.create(
      {
        session: `${connectionName}`,
        logQR: false,
        statusFind: (statusSession: string, session: string) => {
          const { statusLabel, isResetConnection }: ClientMessage = handlerClientMessage(statusSession)
          socket.emit('status-response', {statusSession, session, statusLabel, isResetConnection})
        },
        catchQR: (base64Qrimg: string, asciiQR: string, attempts: string, urlCode: string) => {
          socket.emit('start-response', {asciiQR, base64Qrimg, urlCode, attempts})
        },
      }
    )
  }

  async getMessages(client: any): Promise<any[]> {
    return await client.getAllChats();
  }
}