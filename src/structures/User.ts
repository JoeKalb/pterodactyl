import { Client } from "../client/Client.ts";

export class User{
    protected client!:Client
    public channel!:string
    public username!:string
    

    constructor(client:Client, params:{ username:string, channel:string }){
        this.client = client

        this.channel = params.channel
        this.username = params.username
    }

    /** Ban a user from a channel. Requires moderation permission. */
    public ban(reason=""):void {
        this.client.ban(this.channel, this.username, reason)
    }

    /** Check to see if the user is the channel owner. */
    public isBroadcaster():boolean {
        return this.channel.substring(1) === this.username
    }

    /** Timeout a user for a specific amount of time. */
    public timeout(seconds:number, reason=""):void {
        this.client.timeout(this.channel, this.username, seconds, reason)
    }
}