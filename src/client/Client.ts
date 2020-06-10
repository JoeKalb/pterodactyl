import {
  connectWebSocket,
  isWebSocketCloseEvent,
  WebSocket
} from "https://deno.land/std/ws/mod.ts";
import { Emitter } from "https://deno.land/x/event_kit/mod.ts";
import _ from "../util/utils.ts";

export class Client extends Emitter{
  public socket!: WebSocket;
  public channels: string[] = []

  private password: string = ""
  private username: string = ""
  private interval: number = 0

  public constructor(opts:{
    password:string,
    username:string,
    channels:string[]}){
    super();
    this.password = opts.password
    this.username = opts.username
    this.channels = opts.channels
  }
  
  public async connect(): Promise<void> {
    try{
      this.socket = await connectWebSocket("wss://irc-ws.chat.twitch.tv:443")
      await this.socket.send(`PASS ${this.password}`).catch(console.error)
      await this.socket.send(`NICK ${this.username}`).catch(console.error)
      await this.socket.send('CAP REQ :twitch.tv/commands').catch(console.error)
      await this.socket.send('CAP REQ :twitch.tv/membership').catch(console.error)
      await this.socket.send('CAP REQ :twitch.tv/tags').catch(console.error)

      for(const channel of this.channels){
        this.join(channel)
      }

      const message = async (): Promise<void> => {
        for await (const msg of this.socket){
          if(typeof msg === "string"){
            this.handleMessage(msg)
          }else if(isWebSocketCloseEvent(msg)){
            console.log("Connection Closed.")
            console.log(msg)
          }
        }
      }
      
      await Promise.race([message()]).catch(console.error)

      if(this.socket.isClosed){
        await this.socket.close(1000).catch(console.error)
      }

    }catch(err) {
      console.error(`Could not connect to Twitch IRC: ${err}`)
      Deno.exit(0)
    }
  }

  public async disconnect(): Promise<void> {
    if(!this.socket.isClosed)
      await this.socket.close(1000).catch(console.error)
  }

  private async handleMessage(message: string){
    const messageType = _.messageType(message)
    console.log(messageType)
    //console.log(message)

    switch(messageType){
      case '001':
        break
      case '353':
        break
      case 'CAP':
        break
      case 'JOIN':
        break
      case 'HOSTTARGET':
        break
      case 'PART':
      case 'PING':
        await this.socket.send("PONG :tmi.twitch.tv").catch(console.error)
        break
      case 'PRIVMSG':
        this.emit('chatMessage', message)
        break
      case 'WHISPER':
        break

      default:
        console.log(`Type Not Accounted For: ${messageType}\n Message: ${message}`)
    }
  }

  public async join(channel: string){
    let index = this.channels.indexOf(channel)
    channel = _.formatChannel(channel)
    this.channels.splice(index, 1, channel)
    await this.socket.send(`JOIN ${channel}`).catch(console.error)
  }

  public async part(channel: string){
    channel = _.formatChannel(channel)

    if(this.channels.includes(channel)){
      await this.socket.send(`PART ${channel}`).catch(console.error)
      this.channels.splice(this.channels.indexOf(channel), 1)
    }
    else
      console.error(`Error: ${channel} has not been joined - cannot part`)
  }
}
