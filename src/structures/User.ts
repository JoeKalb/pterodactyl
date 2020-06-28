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

    public ban(reason=""):void {
        this.client.ban(this.channel, this.username, reason)
    }

    public isBroadcaster():boolean {
        return this.channel.substring(1) === this.username
    }

    public timeout(seconds:number, reason=""):void {
        this.client.timeout(this.channel, this.username, seconds, reason)
    }
}