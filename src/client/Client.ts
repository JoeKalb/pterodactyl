import {
  connectWebSocket,
  isWebSocketCloseEvent,
  WebSocket
} from "https://deno.land/std/ws/mod.ts";
import { green, red } from "https://deno.land/std/fmt/colors.ts";
import { EventEmitter } from "https://deno.land/std/node/events.ts";

import _ from "./utils.ts";
import commands from "./commands.ts";
import events from "./events.ts";

import { Userstate } from "../structures/Userstate.ts";

export class Client extends EventEmitter{
  public socket!: WebSocket;
  public channels: string[] = []

  private twitch_client_id!:string
  private password!: string
  private username!: string
  private interval: number = 0
  private connected: boolean = false
  private userstates:{[index:string]:Userstate} = {}

  public constructor(opts:{
    client_id:string,
    password:string,
    username:string,
    channels:string[]}){
    super();
    this.twitch_client_id = opts.client_id
    this.password = opts.password
    this.username = _.username(opts.username)
    this.channels = opts.channels
  }
  
  /** Connect to the Twitch IRC. */
  public async connect():Promise<void> {
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

      const message = async ():Promise<void> => {
        for await (const msg of this.socket){
          if(typeof msg === "string"){
            msg.trimEnd().split('\n').forEach(e => { this.handleEvents(e) })
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

  /** Disconnect from the Twitch IRC. */
  public async disconnect():Promise<void> {
    if(!this.socket.isClosed){
      this.connected = false
      await this.socket.close(1000).catch(console.error)
    }
  }

  private async reconnect():Promise<void> {
    while(!this.connected){
      (this.interval === 0) ? this.interval = 1 : this.interval *=2
      setTimeout(() => {
        this.connect()
      }, this.interval * 1000)
    }

    this.interval = 0
  }

  /** Ban a user from a channel. Requires mod permission. */
  public ban(channel:string, username:string, reason=""):void {
    this.sendCommand(channel, commands.ban(channel, username, reason))
  }

  /** Send a message in a channel. */
  public chat(channel:string, message:string):void {
    this.sendCommand(channel, commands.chat(channel, message))
  }

  /** Clear all the messages in a channel. Requires moderator permission. */
  public clearChat(channel:string):void {
    this.sendCommand(channel, commands.clear(channel))
  }

  /** Change the color of your username. */
  public color(color:string):void {
    this.sendCommand(this.channels[0],commands.color(color))
  }

  /** Run a commercial on a channel. Requires editor permission. */
  public commercial(channel:string, seconds:number):void {
    this.sendCommand(channel, commands.commercial(channel, seconds))
  }

  /** Delete a single message in a chat. Requires moderator permission. */
  public deleteMessage(channel:string, messageID:string):void {
    this.sendCommand(channel, commands.deleteMessage(channel, messageID))
  }

  /** Enable emote only mode. Requires moderator permission. */
  public emoteOnly(channel:string):void {
    this.sendCommand(channel, commands.emoteOnly(channel))
  }

  /** Disable emote only mode. Requires moderator permission. */
  public emoteOnlyOff(channel:string):void {
    this.sendCommand(channel, commands.emoteOnlyOff(channel))
  }

  /** Enable followers only mode. Requires moderator permission. */
  public followers(channel:string, minutes:number):void {
    this.sendCommand(channel, commands.followers(channel, minutes))
  }

  /** Disable followers only mode. Requires moderator permission. */
  public followersOff(channel:string):void {
    this.sendCommand(channel, commands.followersOff(channel))
  }

  /** Select a channel to host. Requires editor permission. */
  public host(channel:string, targetChannel:string):void {
    this.sendCommand(channel, commands.host(channel, targetChannel))
  }

  /** Join a channel. */
  public async join(channel: string):Promise<void> {
    let index = this.channels.indexOf(channel)
    channel = _.channel(channel)

    if(this.userstates.hasOwnProperty(channel)) return

    this.channels.splice(index, 1, channel)
    await this.socket.send(`JOIN ${channel}`).catch(console.error)
  }

  /** Add a marker to the broadcast VOD. Requires editor permission. */
  public marker(channel:string):void {
    this.sendCommand(channel, commands.marker(channel))
  }

  /** Send a message with the same color as your username. */
  public me(channel:string, message:string):void {
    this.sendCommand(channel, commands.me(channel, message))
  }

  /** Give a user moderator permissions. Requires channel owership. */
  public mod(channel:string, username:string):void {
    this.sendCommand(channel, commands.mod(channel, username))
  }

  /** Get the current list of moderators. The response will be found at client.on("notice", (info:Notice) => { info.message }) */
  public mods(channel:string):void {
    this.sendCommand(channel, commands.mods(channel))
  }

  /** Leave a channel. */
  public async part(channel: string):Promise<void> {
    if(!this.connected)
      return

    channel = _.channel(channel)

    if(this.channels.includes(channel)){
      await this.socket.send(`PART ${channel}`).catch(console.error)
      this.channels.splice(this.channels.indexOf(channel), 1)
      delete this.userstates[channel]
    }
    else
      throw console.error(`Error: ${channel} has not been joined - cannot part`)
  }

  /** Enable r9kBeta. Requires moderator permission. */
  public r9k(channel:string):void {
    this.sendCommand(channel, commands.r9kbeta(channel))
  }

  /** Enable r9kBeta. Requires moderator permission. */
  public r9kBeta(channel:string):void {
    this.r9k(channel)
  }

  /** Disable r9kBeta. Requires moderator permission. */
  public r9kBetaOff(channel:string):void {
    this.r9kOff(channel)
  }

  /** Disable r9kBeta. Requires moderator permission. */
  public r9kOff(channel:string):void {
    this.sendCommand(channel, commands.r9kbetaOff(channel))
  }

  /** Raid a channel. Requires editor permission. */
  public raid(channel:string, targetChannel:string):void {
    this.sendCommand(channel, commands.raid(channel, targetChannel))
  }

  /** Send a message that you format yourself. Example `PRIVMSG ${channel} :${message}` */
  public async raw(message: string):Promise<void> {
    if(this.connected)
      await this.socket.send(message).catch(console.error)
  }

  /** Send a message in a channel. */
  public say(channel:string, message:string):void {
    this.chat(channel, message)
  }

  /** Enalbe slow mode. Requires moderator permission. */
  public slow(channel:string, seconds:number):void {
    this.sendCommand(channel, commands.slow(channel, seconds))
  }

  /** Disable slow mode. Requires moderator permission. */
  public slowOff(channel:string):void {
    this.sendCommand(channel, commands.slowOff(channel))
  }

  /** Enable subscriber only mode. Requires moderator permission. */
  public subscribersOnly(channel:string):void {
    this.sendCommand(channel, commands.subscribers(channel))
  }

  /** Disable subscriber only mode. Requires moderator permission. */
  public subscribersOnlyOff(channel:string):void {
    this.sendCommand(channel, commands.subscribersOff(channel))
  }

  /** Timeout a specific user. Requires moderator permission. */
  public timeout(channel:string, username:string, seconds:number, reason=""):void {
    this.sendCommand(channel, commands.timeout(channel, username, seconds, reason))
  }

  /** Unban a specific user. Requires moderator permission. */
  public unban(channel:string, username:string):void {
    this.sendCommand(channel, commands.unban(channel, username))
  }

  /** Disable a host. Requires moderator permission. */
  public unhost(channel:string):void {
    this.sendCommand(channel, commands.unhost(channel))
  }

  /** Remove moderator permissions from a specific user. Requires channel ownership. */
  public unmod(channel:string, username:string):void {
    this.sendCommand(channel, commands.unmod(channel, username))
  }

  /** Disable a raid event. Requires editor permission. */
  public unraid(channel:string):void {
    this.sendCommand(channel, commands.unraid(channel))
  }

  /** Remove a users timeout. Requires moderator permission. */
  public untimeout(channel:string, username:string):void {
    this.sendCommand(channel, commands.untimeout(channel, username))
  }

  /** Remove vip status from a user. Requires channel ownership. */
  public upvip(channel:string, username:string):void {
    this.sendCommand(channel, commands.unvip(channel, username))
  }

  /** Get the current list of a vips in a channel. The response will be found at client.on("notice", (info:Notice) => { info.message }) */
  public vips(channel:string):void {
    this.sendCommand(channel, commands.vips(channel))
  }

  /** Send a whisper to a specific user. */
  public async whisper(username:string, message:string):Promise<void> {
    if(this.connected)
      await this.socket.send(commands.whisper(username, message))
  }

  // Handles all incoming messages to determine what event to emit.
  private async handleEvents(rawMessage: string):Promise<void> {
    const messageType = _.messageType(rawMessage)
    //console.log(messageType)
    //console.log(rawMessage)

    switch(messageType){
      case '001':
        // Client is connected to Twitch WebSocket Client
        this.connected = true
        console.log(green(`Listening to Twitch IRC on port: ${JSON.parse(JSON.stringify(this.socket.conn.localAddr)).port}`))
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
        this.emit('join', events.join(this, rawMessage))
        break
      case 'HOSTTARGET':
        this.emit('hosting', events.hostTarget(this, rawMessage))
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
        this.emit('part', events.part(this, rawMessage))
        break
      case 'PING':
        await this.socket.send("PONG :tmi.twitch.tv").catch(console.error)
        break
      case 'PRIVMSG':
        let newMessage = events.chatMessage(this, rawMessage)
        if(newMessage.hasOwnProperty('bits')){
          console.log(rawMessage)
          this.emit('cheer', newMessage)
        }
        else
          this.emit('chat', newMessage)
        break
      case 'USERNOTICE':
        this.usernoticeHandler(events.usernotice(rawMessage))
        break
      case 'USERSTATE':
        let newUserstate = new Userstate(this.twitch_client_id, events.userstate(rawMessage))
        this.userstates[newUserstate.channel] = newUserstate
        break
      case 'WHISPER':
        this.emit('whisper', events.whisper(this, rawMessage))
        break

      default:
        console.log(`Type Not Accounted For: ${messageType}\n Message: ${rawMessage}`)
    }
  }

  private confirmChannelJoin(message:string):void {
    let [channel, username]:string[] = message
      .substring(message.indexOf('#')).trim().split(' ', 1)

    if(username === this.username && !this.channels.includes(channel))
      this.channels = [...this.channels, channel]
  }

  private async sendCommand(channel:string, command:string):Promise<void> {
    if(!this.connected){
      console.log(red('Client is currently not connected to twitch. Hint: client.connect()'))
      return
    }
    
    channel = _.channel(channel)
    if(!this.channels.includes(channel)){
      await this.join(channel)
      this.on('channelJoined', (channel:any) => { console.log(channel) })
    }

    await this.socket.send(command).catch(console.error)
  }

  private usernoticeHandler(usernotice:{[index:string]:any}):void {
    let notice = {}
    switch(usernotice['msg-id']){
      case 'sub':
        notice = events.sub(this, usernotice)
        break
      case 'resub':
        notice = events.resub(this, usernotice)
        break
      case 'subgift':
        notice = events.subgift(this, usernotice)
        break
      case 'anonsubgift':
        notice = events.subgift(this, usernotice)
        break
      case 'submysterygift':
        notice = events.submysterygift(this, usernotice)
        break
      case 'giftpaidupgrade':
        notice = events.giftPaidUpgrade(this, usernotice)
        break
      case 'rewardgift':
        notice = events.rewardGift(this, usernotice)
        break
      case 'anongiftpaidupgrade':
        notice = events.giftPaidUpgrade(this, usernotice)
        break
      case 'communitypayforward':
        notice = events.communityPayForward(this, usernotice)
        break
      case 'extendsub':
        notice = events.extendSub(this, usernotice)
        break
      case 'primepaidupgrade':
        notice = events.paidPrimeUpgrade(this, usernotice)
        break
      case 'raid':
        notice = events.raid(this, usernotice)
        break
      case 'unraid':
        notice = events.unraid(this, usernotice)
        break
      case 'ritual':
        notice = events.ritual(this, usernotice)
        break
      case 'bitsbadgetier':
        notice = events.bitBadgeTier(this, usernotice)
        break
      case 'standardpayforward':
        notice = events.standardPayForward(this, usernotice)
        break
      default:
        console.log(`Case not found for usernotice: ${usernotice['msg-id']}`)
        console.log(usernotice)
    }
    this.emit(usernotice['msg-id'], notice)
  }
}