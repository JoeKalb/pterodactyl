import { Base } from "./BaseUsernotice.ts";
import { Client } from "../../client/Client.ts";

export class Rewardgift extends Base {
    public msg_param_domain!:string
    public msg_param_selected_count!:number
    public msg_param_total_reward_count!:number
    public msg_param_trigger_amount!:number
    public msg_param_trigger_type!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_domain = params['msg-param-domain']
        this.msg_param_selected_count = params['msg-param-selected-count']
        this.msg_param_total_reward_count = params['msg-param-total-reward-count']
        this.msg_param_trigger_amount = params['msg-param-trigger-amount']
        this.msg_param_trigger_type = params['msg-param-trigger-type']
    }
}