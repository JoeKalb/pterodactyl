import { Base } from "./BaseUsernotice.ts";
import { Client } from "../client/Client.ts";

export class Paidprimeupgrade extends Base{
    public msg_param_sub_plan!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)
        this.msg_param_sub_plan = params['msg-param-sub-plan']
    }
}