import { Base } from "./BaseUsernotice.ts";
import { Client } from "../client/Client.ts";

export class Standardpayforward extends Base{
    public msg_param_prior_gifter_anonymous!:boolean
    public msg_param_prior_gifter_display_name!:string
    public msg_param_prior_gifter_id!:string
    public msg_param_prior_gifter_username!:string
    public msg_param_recipient_display_name!:string
    public msg_param_recipient_id!:string
    public msg_param_recipient_username!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_prior_gifter_anonymous = params['msg-param-prior-gifter-anonymous']
        this.msg_param_prior_gifter_display_name = params['msg-param-prior-gifter-display-name']
        this.msg_param_prior_gifter_id = params['msg-param-prior-gifter-id']
        this.msg_param_prior_gifter_username = params['msg-param-prior-gifter-user-name']
        this.msg_param_recipient_display_name = params['msg-param-recipient-display-name']
        this.msg_param_recipient_id = params['msg-param-recipient-id']
        this.msg_param_recipient_username = params['msg-param-recipient-user-name']
    }
}