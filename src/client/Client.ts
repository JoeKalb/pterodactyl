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

  private password!: string
  private username!: string
  private interval: number = 0
  private connected: boolean = false

  public constructor(opts:{
    password:string,
    username:string,
    channels:string[]}){
    super();
    this.password = opts.password
    this.username = _.username(opts.username)
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

  private async reconnect(): Promise<void>{
    while(!this.connected){
      (this.interval === 0) ? this.interval = 1 : this.interval *=2
      setTimeout(() => {
        this.connect()
      }, this.interval * 1000)
    }

    this.interval = 0
  }

  public ban(channel:string, username:string, reason=""): void{
    this.sendCommand(channel, commands.ban(channel, username, reason))
  }

  public chat(channel:string, message:string): void{
    this.sendCommand(channel, commands.chat(channel, message))
  }

  public clearChat(channel:string): void{
    this.sendCommand(channel, commands.clear(channel))
  }

  public color(color:string): void{
    this.sendCommand(this.channels[0],commands.color(color))
  }

  public commercial(channel:string, seconds:number): void {
    this.sendCommand(channel, commands.commercial(channel, seconds))
  }

  public deleteMessage(channel:string, messageID:string): void {
    this.sendCommand(channel, commands.deleteMessage(channel, messageID))
  }

  public emoteOnly(channel:string): void {
    this.sendCommand(channel, commands.emoteOnly(channel))
  }

  public emoteOnlyOff(channel:string): void {
    this.sendCommand(channel, commands.emoteOnlyOff(channel))
  }

  public followers(channel:string, minutes:number): void {
    this.sendCommand(channel, commands.followers(channel, minutes))
  }

  public followersOff(channel:string): void {
    this.sendCommand(channel, commands.followersOff(channel))
  }

  public help(channel:string): void {
    this.sendCommand(channel, commands.help(channel))
  }

  public host(channel:string, targetChannel:string): void {
    this.sendCommand(channel, commands.host(channel, targetChannel))
  }

  public async join(channel: string): Promise<void>{
    let index = this.channels.indexOf(channel)
    channel = _.channel(channel)
    this.channels.splice(index, 1, channel)
    await this.socket.send(`JOIN ${channel}`).catch(console.error)
  }

  public market(channel:string): void {
    this.sendCommand(channel, commands.marker(channel))
  }

  public me(channel:string, message:string): void {
    this.sendCommand(channel, commands.me(channel, message))
  }

  public mod(channel:string, username:string): void {
    this.sendCommand(channel, commands.mod(channel, username))
  }

  public mods(channel:string): void {
    this.sendCommand(channel, commands.mods(channel))
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

  public r9k(channel:string): void {
    this.sendCommand(channel, commands.r9kbeta(channel))
  }

  public r9kBeta(channel:string): void {
    this.r9k(channel)
  }

  public r9kBetaOff(channel:string): void {
    this.r9kOff(channel)
  }

  public r9kOff(channel:string): void {
    this.sendCommand(channel, commands.r9kbetaOff(channel))
  }

  public raid(channel:string, targetChannel:string): void {
    this.sendCommand(channel, commands.raid(channel, targetChannel))
  }

  public async raw(message: string): Promise<void>{
    if(this.connected)
      await this.socket.send(message).catch(console.error)
  }

  public say(channel:string, message:string):void {
    this.chat(channel, message)
  }

  public slow(channel:string, seconds:number): void {
    this.sendCommand(channel, commands.slow(channel, seconds))
  }

  public slowOff(channel:string): void {
    this.sendCommand(channel, commands.slowOff(channel))
  }

  public subscribersOnly(channel:string): void {
    this.sendCommand(channel, commands.subscribers(channel))
  }

  public subscribersOnlyOff(channel:string): void {
    this.sendCommand(channel, commands.subscribersOff(channel))
  }

  public timeout(channel:string, username:string, seconds:number, reason=""): void {
    this.sendCommand(channel, commands.timeout(channel, username, seconds, reason))
  }

  public unban(channel:string, username:string): void {
    this.sendCommand(channel, commands.unban(channel, username))
  }

  public unhost(channel:string): void {
    this.sendCommand(channel, commands.unhost(channel))
  }

  public unmod(channel:string, username:string): void {
    this.sendCommand(channel, commands.unmod(channel, username))
  }

  public unraid(channel:string): void {
    this.sendCommand(channel, commands.unraid(channel))
  }

  public untimeout(channel:string, username:string): void {
    this.sendCommand(channel, commands.untimeout(channel, username))
  }

  public upvip(channel:string, username:string): void {
    this.sendCommand(channel, commands.unvip(channel, username))
  }

  public vips(channel:string): void {
    this.sendCommand(channel, commands.vips(channel))
  }

  public async whisper(username:string, message:string):Promise<void>{
    if(this.connected)
      await this.socket.send(commands.whisper(username, message))
  }

  // Handles all incoming messages to determine what event to emit.
  private async handleEvents(rawMessage: string): Promise<void>{
    const messageType = _.messageType(rawMessage)
    //console.log(messageType)
    //console.log(rawMessage)

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
        this.emit('channelJoined', true)
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
        console.log(rawMessage)
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
        this.emit('notice', events.notice(rawMessage))
        break
      case 'ROOMSTATE':
        this.emit('roomState', events.roomstate(rawMessage))
        break
      case 'RECONNECT':
        this.reconnect()
        break
      case 'PART':
        break
      case 'PING':
        await this.socket.send("PONG :tmi.twitch.tv").catch(console.error)
        break
      case 'PRIVMSG':
        let newMessage = events.chatMessage(this, rawMessage)
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
        this.emit('whisper', events.whisper(this, rawMessage))
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

  private async sendCommand(channel:string, command:string): Promise<void> {
    if(!this.connected)
      return
    
    channel = _.channel(channel)
    if(!this.channels.includes(channel)){
      await this.join(channel)
      await this.on('channelJoined', (channel:{}) => { console.log(channel) })
    }

    await this.socket.send(command).catch(console.error)
  }
}