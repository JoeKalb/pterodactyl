// For anongiftpaidupgrade and giftpaidupgrade usernotices

import { Base } from "./BaseUsernotice.ts";
import { Client } from "../client/Client.ts";

export class Giftpaidupgrade extends Base{
    public msg_param_promo_gift_total!:number
    public msg_param_promo_name!:string
    public msg_param_sender_login?:string
    public msg_param_sender_name?:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_promo_gift_total = params['msg-param-promo-gift-total']
        this.msg_param_promo_name = params['msg-param-promo-name']
        if(params.hasOwnProperty('msg-param-sender-login'))
            this.msg_param_sender_login = params['msg-param-sender-login']
        if(params.hasOwnProperty('msg-param-sender-name'))
            this.msg_param_sender_name = params['msg-param-sender-name']
    }
}