import { Client } from "../../client/Client.ts";
import { Emote } from "../Emote.ts";
import { User } from "../User.ts";
import _ from "../../client/utils.ts";

export class Base extends User{
    public badge_info!:string
    public badges!:string[]
    public color!:string
    public display_name!:string
    public emotes!:Emote[]
    public id!:string
    public login!:string
    public message?:string
    public mod!:boolean
    public msg_id!:string
    public room_id!:string
    public subscriber!:string
    public system_msg!:string
    public tmi_sent_ts!:string
    public turbo!:boolean
    public user_id!:string
    public user_type!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client,{ 
            username:params.username,
            channel:params.channel
        })
        this.badge_info = params['badge-info']
        this.badges = (params['badges'].length > 0) 
            ? params['badges'].split(',')
            : []
        this.color = params['color']
        this.display_name = params['display-name']
        this.emotes = _.emoteBreakdown(params['emotes']).map(e =>{
            return new Emote(e)
        })
        this.id = params['id']
        this.login = params['login']
        if(params.hasOwnProperty('message'))
            this.message = params['message']
        this.mod = params['mod']
        this.msg_id = params['msg-id']
        this.room_id = params['room-id']
        this.subscriber = params['subscriber']
        this.system_msg = params['system-msg']
        this.tmi_sent_ts = params['tmi-sent-ts']
        this.turbo = params['turbo']
        this.user_id = params['user-id']
        this.user_type = params['user-type']
    }

    /** Send a message in the same channel as the usernotice with `@${this.display_name}` at the beginning of the message. */
    public reply(message:string):void {
        this.client.chat(this.channel, `@${this.display_name} ${message}`)
    }

    /** Send a message in the same channel as the usernotice. */
    public say(message:string):void {
        this.client.chat(this.channel, message)
    }

    /** Send a whisper to the user who triggered the usernotice. */
    public whisper(message:string):void {
        this.client.whisper(this.username, message)
    }
}