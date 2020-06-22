import { Base } from "./BaseUsernotice.ts";
import { Client } from "../client/Client.ts";

export class Bitbadgetier extends Base{
    public msg_param_threshold!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_threshold = params['msg-param-threshold']
    }
}