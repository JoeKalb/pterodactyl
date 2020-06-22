import { Emote } from "./Emote.ts";

export class Userstate{
    private TWITCH_CLIENT_ID!:string

    public badge_info!:string
    public badges!:string[]
    public channel!:string
    public color!:string
    public display_name!:string
    public emote_sets!:string[]
    public mod!:boolean
    public subscriber!:boolean
    public user_type!:string

    constructor(CLIENT_ID:string, params:{[index:string]:any}){
        this.TWITCH_CLIENT_ID = CLIENT_ID

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

    public async getEmoteNames():Promise<{}> {
        let emotes:{[index:string]:any} = {}

        const res = await fetch(`https://api.twitch.tv/kraken/chat/emoticon_images?emotesets=${this.emote_sets.join(',')}`,{
            headers:{
                'Accept':'application/vnd.twitchtv.v5+json',
                'Client-ID': `${this.TWITCH_CLIENT_ID}`
            }
        })

        const json = await res.json().catch(console.error)

        /* if(json.hasOwnProperty('emoticon_sets')){
            let keys:string[] = Object.keys(json['emoticon_sets'])

            keys.forEach(key => {
                emotes = [ 
                    ...emotes, 
                    {
                        emoticon_set:key,
                        code:json['emoticon_sets'][key].code,
                        id:json['emoticon_sets'][key].id,
                        emote:new Emote(json['emoticon_sets'][key].id)
                    }
                ] 
            })
        } */

        if(json.hasOwnProperty('emoticon_sets'))
            emotes = json['emoticon_sets']
        return emotes
    }
}