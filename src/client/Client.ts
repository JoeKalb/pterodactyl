import {
  connectWebSocket,
  isWebSocketCloseEvent,
  WebSocket
} from "https://deno.land/std/ws/mod.ts";
import { Emitter } from "https://deno.land/x/event_kit/mod.ts";
import _ from "./utils.ts";
import commands from "./commands.ts";
import events from "./events.ts";

export class Client extends Emitter{
  public socket!: WebSocket;
  public channels: string[] = []

  private password: string = ""
  private username: string = ""
  private interval: number = 0
  private connected: boolean = false

  public constructor(opts:{
    password:string,
    username:string,
    channels:string[]}){
    super();
    this.password = opts.password
    this.username = opts.username.toLowerCase()
    this.channels = opts.channels
  }
  
  /* 
    Public methods available to the client
  */
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
            msg.trim().split('\n').forEach(e => { this.handleEvents(e) })
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
    if(!this.socket.isClosed){
      this.connected = false
      await this.socket.close(1000).catch(console.error)
    }
  }

  public async join(channel: string){
    let index = this.channels.indexOf(channel)
    channel = _.channel(channel)
    this.channels.splice(index, 1, channel)
    await this.socket.send(`JOIN ${channel}`).catch(console.error)
  }

  public async part(channel: string){
    channel = _.channel(channel)

    if(this.channels.includes(channel)){
      await this.socket.send(`PART ${channel}`).catch(console.error)
      this.channels.splice(this.channels.indexOf(channel), 1)
    }
    else
      throw console.error(`Error: ${channel} has not been joined - cannot part`)
  }

  public async chat(channel:string, message:string){
    await this.socket.send(commands.chat(channel, message)).catch(console.error)
  }

  // Handles all incoming messages to determine what event to emit.
  private async handleEvents(message: string){
    const messageType = _.messageType(message)
    //console.log(messageType)
    //console.log(message)

    switch(messageType){
      case '001':
        // Client is connected to Twitch WebSocket Client
        this.connected = true
        break
      case '002':
        break
      case '003':
        break
      case '004':
        break
      case '353':
        this.confirmChannelJoin(message)
        break
      case '366':
        break
      case '372':
        break
      case '375':
        break
      case '376':
        break
      case '421':
        break
      case 'CAP':
        break
      case 'CLEARCHAT':
        break
      case 'CLEARMSG':
        break
      case 'JOIN':
        //console.log(message)
        break
      case 'HOSTTARGET':
        break
      case 'NOTICE':
        break
      case 'ROOMSTATE':
        break
      case 'PART':
        break
      case 'PING':
        await this.socket.send("PONG :tmi.twitch.tv").catch(console.error)
        break
      case 'PRIVMSG':
        let newMessage = events.chatMessage(message)
        if(newMessage.hasOwnProperty('bits'))
          this.emit('cheerMessage', newMessage)
        else
          this.emit('chatMessage', newMessage)
        break
      case 'USERNOTICE':
        let usernotice:{[index:string]:any} = events.usernotice(message)
        this.emit(usernotice['msg-id'], usernotice)
        break
      case 'USERSTATE':
        break
      case 'WHISPER':
        this.emit('whisper', events.whisper(message))
        break

      default:
        console.log(`Type Not Accounted For: ${messageType}\n Message: ${message}`)
    }
  }

  private confirmChannelJoin(message:string):void{
    let [channel, username]:string[] = message
      .substring(message.indexOf('#')).trim().split(' ', 1)

    if(username === this.username && !this.channels.includes(channel))
      this.channels = [...this.channels, channel]
  }
}
