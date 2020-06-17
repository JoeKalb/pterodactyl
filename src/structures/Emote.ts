export class Emote{
    public emote_id!:string
    public characters!:any[]

    constructor(emoteString:string){
        const colonIndex = emoteString.indexOf(':')
        this.emote_id = emoteString
            .substring(0, colonIndex)
        this.characters = emoteString
            .substring(colonIndex+1).split(',')
    }

    public getEmoteURL(size="1.0"):string{
        return `http://static-cdn.jtvnw.net/emoticons/v1/${this.emote_id}/${size}`
    }
}