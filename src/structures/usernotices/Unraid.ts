import { Base } from "./BaseUsernotice.ts";
import { Client } from "../../client/Client.ts";

export class Unraid extends Base{
    constructor(client:Client, params:{[index:string]:any}){
        super(client, params)
    }
}