import _ from "../client/utils.ts";
import { User } from "./User.ts";

export class Message extends User {
    public badge_info?:string
    public badges?:string[]
    public client_nonce?:string
    public color?:string
    public display_name?:string
    public emote_only?:boolean
    public emotes:any[]
    public flags?:string
    public id?:string
    public mod:boolean = false
    public room_id?:string
    public subscriber?:boolean
    public text?:string
    public tmi_sent_ts?:string
    public turbo?:boolean
    public user_id?:string
    public user_type?:string
    

    constructor(params:{[index:string]:any}){
        super({ 
            username:params.username,
            channel:params.channel
        })

        this.badge_info = params['badge-info']
        this.badges = params['badges'].split(',')
        this.client_nonce = params['client-nonce']
        this.color = params['color']
        this.display_name = params['display-name']
        this.emote_only = (params.hasOwnProperty('emote-only'))
            ? params['emote-only']
            : false
        this.emotes =  _.emoteBreakdown(params['emotes'])
        this.flags = params['flags']
        this.id = params['id']
        this.mod = params['mod']
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
}