// For subgift and anonsubgift events

import { Base } from "./BaseUsernotice.ts";
import { Client } from "../../client/Client.ts";

export class Subgift extends Base{
    public msg_param_months!:number
    public msg_param_recipient_display_name!:string
    public msg_param_recipient_id!:string
    public msg_param_recipient_username!:string
    public msg_param_sub_plan!:string
    public msg_param_sub_plan_name!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_months = params['msg-param-months']
        this.msg_param_recipient_display_name = params['msg-param-recipient-display-name']
        this.msg_param_recipient_id = params['msg-param-recipient-id']
        this.msg_param_recipient_username = params['msg-param-recipient-user-name']
        this.msg_param_sub_plan = params['msg-param-sub-plan']
        this.msg_param_sub_plan_name = params['msg-param-sub-plan-name']
    }
}