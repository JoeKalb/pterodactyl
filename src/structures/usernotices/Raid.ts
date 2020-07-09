import { Base } from "./BaseUsernotice.ts";
import { Client } from "../../client/Client.ts";

export class Raid extends Base{
    public msg_param_displayName!:string
    public msg_param_login!:string
    public msg_param_viewerCount!:number

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)
        this.msg_param_displayName = params['msg-param-displayName']
        this.msg_param_login = params['msg-param-login']
        this.msg_param_viewerCount = params['msg-param-viewerCount']
    }

    /** Enable follower only chat setting. Required moderation permission. */
    public followerOnly(minutes=1):void{
        this.client.followers(this.channel, minutes)
    }

    /** Disable follower only chat setting. Required moderation permission. */
    public followersOff():void {
        this.client.followersOff(this.channel)
    }

    /** Enable r9k chat setting. Required moderation permission. */
    public r9k():void {
        this.client.r9k(this.channel)
    }

    /** Disable r9k chat setting. Required moderation permission. */
    public r9kOff():void {
        this.client.r9kOff(this.channel)
    }

    /** Enable subscriber only chat setting. Required moderation permission. */
    public subscriberOnly():void {
        this.client.subscribersOnly(this.channel)
    }

    /** Disable subscriber only chat setting. Required moderation permission. */
    public subscriberOnlyOff():void {
        this.client.subscribersOnlyOff(this.channel)
    }
}