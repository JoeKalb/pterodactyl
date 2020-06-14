import _ from "./utils.ts";


/* 
    standard chat command format
    `PRIVMSG ${channel} :${command}`
    https://dev.twitch.tv/docs/irc/guide
*/
const commands = {
    chat: (channel:string, message:string):string => {
        channel = _.channel(channel)
        return `PRIVMSG ${channel} :${message}`
    },

    whisper: (username:string, message:string):string => {
        username = username.trim().toLowerCase()
        return `PRIVMSG \w ${username} ${message}`
    }
}

export default commands