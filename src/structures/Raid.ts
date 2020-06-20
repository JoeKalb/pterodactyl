import { Base } from "./BaseUsernotice.ts";
import { Client } from "../client/Client.ts";

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
}