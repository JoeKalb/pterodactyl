export class Notice{
    public channel!:string
    public message!:string
    public msg_id!:string

    constructor(params:{[index:string]:string}){
        this.channel = params['channel']
        this.message = params['message']
        this.msg_id = params['msg-id']
    }
}