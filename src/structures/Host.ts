import { Client } from "../client/Client.ts";

export class Host{
    private client!:Client
    public channel!:string
    public host_channel!:string

    constructor(client:Client, params:{[index:string]:any}){
        this.client = client
        this.channel = params['channel']
        this.host_channel = params['host']
    }

    public join():void {
        this.client.join(this.host_channel)
    }

    public unhost():void {
        this.client.unhost(this.channel)
    }
}