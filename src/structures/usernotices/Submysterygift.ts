import { Base } from "./BaseUsernotice.ts";
import { Client } from "../../client/Client.ts";

export class Submysterygift extends Base{
    public msg_param_mass_gift_count!:number

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_mass_gift_count = params['msg-param-mass-gift-count']
    }
}