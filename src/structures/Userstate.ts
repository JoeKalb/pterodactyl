export class Userstate{
    public badge_info!:string
    public badges!:string[]
    public channel!:string
    public color!:string
    public display_name!:string
    public emote_sets!:string[]
    public mod!:boolean
    public subscriber!:boolean
    public user_type!:string

    constructor(params:{[index:string]:any}){
        this.badge_info = params['badge-info']
        this.badges = (params['badges'].length > 0) 
            ? params['badges'].split(',')
            : []
        this.channel = params['channel']
        this.color = params['color']
        this.display_name = params['display-name']
        this.emote_sets = params['emote-sets'].split(',')
        this.mod = params['mod']
        this.subscriber = params['subscriber']
        this.user_type = params['user-type']
    }
}