export class User{
    public username!:string
    public channel!:string

    constructor(params:{ username:string, channel:string }){
        this.username = params.username
        this.channel = params.channel
    }
}