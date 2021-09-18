import { OnMessage } from "./OnMessage";

export function beginningSection(client: any): void{
    client.onMessage((message: any) => OnMessage(client, message));
}