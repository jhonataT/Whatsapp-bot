import { setMessageSetup } from "./messageSetup";
import { groupMsg } from "../Groups/GroupMessage";
import { imageAsSticker } from "../Commands/imageSticker";

export async function OnMessage(client: any, msg: any) {
  // await client.sendSeen(msg.from);
  const { PREFIX, CMD_NAME, ARGS } = setMessageSetup(msg);
  
  console.log(CMD_NAME);
  if(!msg.body) msg.body = 'nothing here!'; // if message.body is null
  if(CMD_NAME === ''){
    return;
  }
  
  if(msg.isMedia === false && msg.isGroupMsg === true)
    groupMsg(client, msg, CMD_NAME, ARGS);
  else if(msg.isMedia === true)
    imageAsSticker(client, msg, CMD_NAME);
}
