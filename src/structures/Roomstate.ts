export class Roomstate{
    public channel!:string
    public emote_only!:boolean
    public followers_only!:number
    public r9k!:boolean
    public rituals!:string
    public room_id!:string
    public slow!:number
    public subs_only!:boolean

    constructor(params:{[index:string]:any}){
        this.channel = params['channel']
        this.emote_only = params['emote-only']
        this.followers_only = params['followers-only']
        this.r9k = params['r9k']
        this.rituals = params['rituals']
        this.room_id = params['room-id']
        this.slow = params['slow']
        this.subs_only = params['subs-only']
    }
}