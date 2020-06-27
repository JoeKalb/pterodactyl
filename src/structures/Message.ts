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
    public text!:string
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
        this.text = params['text']
        this.tmi_sent_ts = params['tmi-sent-ts']
        this.turbo = params['turbo']
        this.user_id = params['user-id']
        this.user_type = params['user-type']
    }

    public hasEmotes():boolean {
        return this.emote_only || this.emotes.length > 0
    }

    public isMod():boolean {
        return this.mod
    }

    // Client Interfaces for a shortcut to specific commands
    public chat(message:string):void {
        this.client.chat(this.channel, message)
    }

    public deleteMessage():void {
        this.client.deleteMessage(this.channel, this.id)
    }

    public me(message:string):void {
        this.client.me(this.channel, message)
    }

    public reply(message:string):void {
        this.client.chat(this.channel, `@${this.display_name} ${message}`)
    }

    public send(message:string):void {
        this.chat(message)
    }

    public whisper(message:string):void {
        this.client.whisper(this.username, message)
    }
}