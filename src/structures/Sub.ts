import { Base } from "./BaseUsernotice.ts";
import { Client } from "../client/Client.ts";

export class Sub extends Base{
    public msg_param_cumulative_months!:number
    public msg_param_should_share_streak!:boolean
    public msg_param_streak_months!:number
    public msg_param_sub_plan!:string
    public msg_param_sub_plan_name!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)
        this.msg_param_cumulative_months = params['msg-param-cumulative-months']
        this.msg_param_should_share_streak = params['msg-param-should-share-streak']
        this.msg_param_streak_months = params['msg-param-streak-months']
        this.msg_param_sub_plan = params['msg-param-sub-plan']
        this.msg_param_sub_plan_name = params['msg-param-sub-plan-name']
    }
}