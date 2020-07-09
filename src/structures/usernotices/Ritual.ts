import { Base } from "./BaseUsernotice.ts";
import { Client } from "../../client/Client.ts";

export class Ritual extends Base{
    public msg_param_ritual_name!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_ritual_name = params['msg-param-ritual-name']
    }
}