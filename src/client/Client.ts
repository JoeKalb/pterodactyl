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

  public async disconnect(): Promise<void>{
    if(!this.socket.isClosed){
      this.connected = false
      await this.socket.close(1000).catch(console.error)
    }
  }

  public async chat(channel:string, message:string){
    if(!this.connected)
      return
    
    await this.socket.send(commands.chat(channel, message)).catch(console.error)
  }

  public async clearChat(channel:string): Promise<void>{
    if(this.connected)
      await this.socket.send(commands.clear(channel)).catch(console.error)
  }

  public async color(color:string): Promise<void>{
    if(this.connected)
      await this.socket.send(commands.color(color)).catch(console.error)
  }

  public async commercial(channel:string, seconds:number): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.commercial(channel, seconds)).catch(console.error)
  }

  public async deleteMessage(channel:string, messageID:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.deleteMessage(channel, messageID)).catch(console.error)
  }

  public async emoteOnly(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.emoteOnly(channel)).catch(console.error)
  }

  public async emoteOnlyOff(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.emoteOnlyOff(channel)).catch(console.error)
  }

  public async followers(channel:string, minutes:number): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.followers(channel, minutes)).catch(console.error)
  }

  public async followersOff(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.followersOff(channel)).catch(console.error)
  }

  public async help(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.help(channel)).catch(console.error)
  }

  public async host(channel:string, targetChannel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.host(channel, targetChannel)).catch(console.error)
  }

  public async join(channel: string): Promise<void>{
    let index = this.channels.indexOf(channel)
    channel = _.channel(channel)
    this.channels.splice(index, 1, channel)
    await this.socket.send(`JOIN ${channel}`).catch(console.error)
  }

  public async market(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.marker(channel)).catch(console.error)
  }

  public async me(channel:string, message:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.me(channel, message)).catch(console.error)
  }

  public async mod(channel:string, username:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.mod(channel, username)).catch(console.error)
  }

  public async mods(channel:string):Promise<void>{
    if(this.connected)
      await this.socket.send(commands.mods(channel)).catch(console.error)
  }

  public async part(channel: string): Promise<void>{
    if(!this.connected)
      return

    channel = _.channel(channel)

    if(this.channels.includes(channel)){
      await this.socket.send(`PART ${channel}`).catch(console.error)
      this.channels.splice(this.channels.indexOf(channel), 1)
    }
    else
      throw console.error(`Error: ${channel} has not been joined - cannot part`)
  }

  public async r9k(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.r9kbeta(channel)).catch(console.error)
  }

  public async r9kBeta(channel:string): Promise<void> {
    this.r9k(channel)
  }

  public async r9kBetaOff(channel:string): Promise<void> {
    this.r9kOff(channel)
  }

  public async r9kOff(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.r9kbetaOff(channel)).catch(console.error)
  }

  public async raid(channel:string, targetChannel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.raid(channel, targetChannel)).catch(console.error)
  }

  public async raw(message: string): Promise<void>{
    if(this.connected)
      await this.socket.send(message).catch(console.error)
  }

  public async slow(channel:string, seconds:number): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.slow(channel, seconds)).catch(console.error)
  }

  public async slowOff(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.slowOff(channel)).catch(console.error)
  }

  public async subscribersOnly(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.subscribers(channel)).catch(console.error)
  }

  public async subscribersOnlyOff(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.subscribersOff(channel)).catch(console.error)
  }

  public async timeout(channel:string, username:string, seconds:number, reason=""): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.timeout(channel, username, seconds, reason))
        .catch(console.error)
  }

  public async unban(channel:string, username:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.unban(channel, username)).catch(console.error)
  }

  public async unhost(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.unhost(channel)).catch(console.error)
  }

  public async unmod(channel:string, username:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.unmod(channel, username))
  }

  public async unraid(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.unraid(channel))
  }

  public async untimeout(channel:string, username:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.untimeout(channel, username)).catch(console.error)
  }

  public async upvip(channel:string, username:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.unvip(channel, username)).catch(console.error)
  }

  public async vips(channel:string): Promise<void> {
    if(this.connected)
      await this.socket.send(commands.vips(channel)).catch(console.error)
  }

  public async whisper(username:string, message:string):Promise<void>{
    if(this.connected)
      await this.socket.send(commands.whisper(username, message))
  }

  // Handles all incoming messages to determine what event to emit.
  private async handleEvents(rawMessage: string): Promise<void>{
    const messageType = _.messageType(rawMessage)
    //console.log(messageType)
    console.log(rawMessage)

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
        this.confirmChannelJoin(rawMessage)
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
        let timeoutOrBan:{[index:string]:any} = events.clearChat(rawMessage)
        this.emit((timeoutOrBan['ban-duration'] === -1)? 'ban':'timeout', timeoutOrBan)
        break
      case 'CLEARMSG':
        this.emit('messageDeleted', events.clearMessage(rawMessage))
        break
      case 'JOIN':
        //console.log(message)
        break
      case 'HOSTTARGET':
        break
      case 'NOTICE':
        console.log(rawMessage)
        break
      case 'ROOMSTATE':
        break
      case 'PART':
        break
      case 'PING':
        await this.socket.send("PONG :tmi.twitch.tv").catch(console.error)
        break
      case 'PRIVMSG':
        let newMessage = events.chatMessage(rawMessage)
        if(newMessage.hasOwnProperty('bits'))
          this.emit('cheer', newMessage)
        else
          this.emit('chat', newMessage)
        break
      case 'USERNOTICE':
        let usernotice:{[index:string]:any} = events.usernotice(rawMessage)
        this.emit(usernotice['msg-id'], usernotice)
        break
      case 'USERSTATE':
        break
      case 'WHISPER':
        this.emit('whisper', events.whisper(rawMessage))
        break

      default:
        console.log(`Type Not Accounted For: ${messageType}\n Message: ${rawMessage}`)
    }
  }

  private confirmChannelJoin(message:string):void{
    let [channel, username]:string[] = message
      .substring(message.indexOf('#')).trim().split(' ', 1)

    if(username === this.username && !this.channels.includes(channel))
      this.channels = [...this.channels, channel]
  }
}
