import _ from "../client/utils.ts";
import { Client } from "../client/Client.ts";
import { Emote } from "./Emote.ts";
import { User } from "./User.ts";

export class Message extends User {
    public badge_info?:string
    public badges?:string[]
    public client_nonce?:string
    public color?:string
    public display_name!:string
    public emote_only?:boolean
    public emotes:Emote[]
    public flags?:string
    public id!:string
    public mod:boolean = false
    public room_id?:string
    public says!:string
    public subscriber?:boolean
    public tmi_sent_ts?:string
    public turbo?:boolean
    public user_id?:string
    public user_type?:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client,{ 
            username:params.username,
            channel:params.channel
        })

        this.badge_info = params['badge-info']
        this.badges = (params['badges'].length > 0) 
            ? params['badges'].split(',')
            : []
        this.client_nonce = params['client-nonce']
        this.color = params['color']
        this.display_name = params['display-name']
        this.emote_only =  params['emote-only'] || false
        this.emotes =  _.emoteBreakdown(params['emotes']).map(e => {
            return new Emote(e)
        })
        this.flags = params['flags']
        this.id = params['id']
        this.mod = params['mod']
        this.says = params['text']
        this.subscriber = params['subscriber']
        this.tmi_sent_ts = params['tmi-sent-ts']
        this.turbo = params['turbo']
        this.user_id = params['user-id']
        this.user_type = params['user-type']
    }

    /** Check to see if there are emotes in the message. */
    public hasEmotes():boolean {
        return this.emote_only || this.emotes.length > 0
    }

    /** Check to see if the message sender is a channel moderator. */
    public isMod():boolean {
        return this.mod
    }

    /** Send a message to the same channel that this message was sent in. */
    public chat(message:string):void {
        this.client.chat(this.channel, message)
    }

    /** Delete a message from chat. Requires moderation permission. */
    public deleteMessage():void {
        this.client.deleteMessage(this.channel, this.id)
    }

    /** Send a message to the same channel as this message with the same color as this bots username. */
    public me(message:string):void {
        this.client.me(this.channel, message)
    }

    /** Send a message to the same channel as this message while adding @${this.display_name} at the beginning of the message. */
    public reply(message:string):void {
        this.client.chat(this.channel, `@${this.display_name} ${message}`)
    }

    /** Send a message to the same channel as this message. *Same as the chat() function. */
    public say(message:string):void {
        this.chat(message)
    }

    /** Send a whisper to the author of this message. */
    public whisper(message:string):void {
        this.client.whisper(this.username, message)
    }
}