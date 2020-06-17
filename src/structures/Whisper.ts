import _ from "../client/utils.ts";
import { Emote } from "./Emote.ts";

export class Whisper{
    public badges!:[string]
    public color!:string
    public display_name!:string
    public emotes:Emote[]
    public message_id!:number
    public text!:string
    public thread_id!:string
    public turbo!:boolean
    public user_id!:string
    public user_type!:string
    public username!:string

    constructor(params:{[index:string]:any}){
        this.badges = params['badges'].split(',')
        this.color = params['color']
        this.display_name = params['display-name']
        this.emotes = _.emoteBreakdown(params['emotes']).map(e => {
            return new Emote(e)
        })
        this.message_id = params['message-id']
        this.text = params['text']
        this.thread_id = params['thread-id']
        this.turbo = params['turbo']
        this.user_id = params['user-id']
        this.user_type = params['user-type']
        this.username = params['username']
    }
}