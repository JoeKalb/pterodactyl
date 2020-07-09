import { Base } from "./BaseUsernotice.ts";
import { Client } from "../../client/Client.ts";

export class Extendsub extends Base{
    public msg_param_cumulative_months!:number
    public msg_param_sub_benefit_end_month!:number
    public msg_param_sub_plan!:string

    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)

        this.msg_param_cumulative_months = params['msg-param-cumulative-months']
        this.msg_param_sub_benefit_end_month = params['msg-param-sub-benefit-end-month']
        this.msg_param_sub_plan = params['msg-param-sub-plan']
    }
}