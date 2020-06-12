import _ from "./utils.ts";


/* 
    standard chat command format
    `PRIVMSG ${channel} :${command}`
    https://dev.twitch.tv/docs/irc/guide
*/
const commands = {
    chat: (channel:string, message:string) =>{
        channel = _.channel(channel)
        return `PRIVMSG ${channel} :${message}`
    }
}

export default commands