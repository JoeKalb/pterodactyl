import _ from "../client/utils.ts";
import { Client } from "../../mod.ts";
import { Emote } from "./Emote.ts";

export class Whisper{
    private client!:Client
    public badges!:[string]
    public color!:string
    public display_name!:string
    public emotes:Emote[]
    public message_id!:number
    public says!:string
    public text!:string
    public thread_id!:string
    public turbo!:boolean
    public user_id!:string
    public user_type!:string
    public username!:string

    constructor(client:Client, params:{[index:string]:any}){
        this.client = client
        this.badges = params['badges'].split(',')
        this.color = params['color']
        this.display_name = params['display-name']
        this.emotes = _.emoteBreakdown(params['emotes']).map(e => {
            return new Emote(e)
        })
        this.message_id = params['message-id']
        this.says = params['text']
        this.text = params['text']
        this.thread_id = params['thread-id']
        this.turbo = params['turbo']
        this.user_id = params['user-id']
        this.user_type = params['user-type']
        this.username = params['username']
    }

    /** Check to see if the whisper has emotes. */
    public hasEmotes():boolean {
        return this.emotes.length > 0
    }

    /** Send a whisper back to the user that sent it. */
    public say(message:string):void {
        this.client.whisper(this.username, message)
    }
}