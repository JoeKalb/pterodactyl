import _ from "./utils.ts";


const formatChannelCommand = (channel:string, message:string):string => {
    channel = _.channel(channel)
    return `PRIVMSG ${channel} :${message}`
}
/* 
    standard chat command format
    `PRIVMSG ${channel} :${command}`
    https://dev.twitch.tv/docs/irc/guide
*/
const commands = {
    ban: (channel:string, username:string, reason=""):string => {
        username = _.username(username)
        return formatChannelCommand(channel, `/ban ${username} ${reason}`) 
    },

    chat: (channel:string, message:string):string => {
        return formatChannelCommand(channel, message)
    },

    clear: (channel:string):string => {
        return formatChannelCommand(channel, `/clear`)
    },

    color: (color:string):string => {
        return `PRIVMSG #tmijs :/color ${color}`
    },

    commercial: (channel:string, seconds:number):string => {
        seconds = Math.ceil(seconds)
        if(seconds < 30)
            seconds = 30
        return formatChannelCommand(channel, `/commercial ${seconds}`)
    },

    deleteMessage: (channel:string, messageID:string):string => {
        return formatChannelCommand(channel, `/delete ${messageID}`)
    },

    emoteOnly: (channel:string):string => {
        return formatChannelCommand(channel, "/emoteonly")
    },

    emoteOnlyOff: (channel:string):string => {
        return formatChannelCommand(channel, "/emoteonlyoff")
    },

    followers: (channel:string, minutes:number):string => {
        minutes = Math.ceil(minutes)
        if(minutes === 0)
            minutes = 1
        return formatChannelCommand(channel, `/followers ${minutes}`)
    },

    followersOff: (channel:string):string => {
        return formatChannelCommand(channel, "/followersoff")
    },

    help: (channel:string):string => {
        return formatChannelCommand(channel, "/help")
    },

    host: (channel:string, targetChannel:string):string => {
        targetChannel = _.username(targetChannel)
        return formatChannelCommand(channel, `/host ${targetChannel}`)
    },

    marker: (channel:string):string => {
        return formatChannelCommand(channel, "/marker")
    },

    me: (channel:string, message:string):string => {
        return formatChannelCommand(channel, `/me ${message}`)
    },

    mod: (channel:string, username:string):string => {
        username = _.username(username)
        return formatChannelCommand(channel, `/mod ${username}`)
    },

    mods: (channel:string):string => {
        return formatChannelCommand(channel, "/mods")
    },

    r9kbeta: (channel:string):string => {
        return formatChannelCommand(channel, "/r9kbeta")
    },

    r9kbetaOff: (channel:string):string => {
        return formatChannelCommand(channel, "/r9kbetaoff")
    },

    raid: (channel:string, targetChannel:string):string => {
        targetChannel = _.username(targetChannel)
        return formatChannelCommand(channel, `/raid ${targetChannel}`)
    },

    slow: (channel:string, seconds:number):string => {
        seconds = Math.ceil(seconds)
        if(seconds === 0)
            seconds = 1
        return formatChannelCommand(channel, `/slow ${seconds}`)
    },

    slowOff: (channel:string):string => {
        return formatChannelCommand(channel, "/slowoff")
    },

    subscribers: (channel:string):string => {
        return formatChannelCommand(channel, "/subscribers")
    },

    subscribersOff: (channel:string):string => {
        return formatChannelCommand(channel, "/subscribersoff")
    },

    timeout: (channel:string, username:string, seconds:number, reason=""):string => {
        username = _.username(username)
        seconds = (seconds < 1)? 1:Math.ceil(seconds)
        return formatChannelCommand(channel, `/timeout ${username} ${seconds} ${reason}`)
    },

    unban: (channel:string, username:string):string => {
        username = _.username(username)
        return formatChannelCommand(channel, `/unban ${username}`)
    },

    unhost: (channel:string):string => {
        return formatChannelCommand(channel, "/unhost")
    },

    unmod: (channel:string, username:string):string => {
        username = _.username(username)
        return formatChannelCommand(channel, `/unmod ${username}`)
    },

    unraid: (channel:string):string => {
        return formatChannelCommand(channel, "/unraid")
    },

    untimeout: (channel:string, username:string):string => {
        username = _.username(username)
        return formatChannelCommand(channel, `/untimeout ${username}`)
    },

    unvip: (channel:string, username:string):string => {
        username = _.username(username)
        return formatChannelCommand(channel, `/unvip ${username}`)
    },

    vip: (channel:string, username:string):string => {
        username = _.username(username)
        return formatChannelCommand(channel, `/vip ${username}`)
    },

    vips: (channel:string):string => {
        return formatChannelCommand(channel, `/vips`)
    },

    whisper: (username:string, message:string):string => {
        username = _.username(username)
        return formatChannelCommand("#tmijs", `/w ${username} ${message}`)
    }
}

export default commands