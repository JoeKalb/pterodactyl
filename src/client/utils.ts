

const _ =  {
    channel(channel: string):string{
        channel = channel.toLocaleLowerCase().trim()

        if(channel[0] !== '#')
            channel = `#${channel}`

        return channel
    },

    emoteBreakdown(emoteString:string):any[]{
        if(emoteString === "" || emoteString === undefined) 
            return []

        return emoteString.split('/')
        /* return emoteString.split('/').map(e => {
            ({
                emoteID:e.substring(e.indexOf(':')),
                chatPositions:e.substring(e.indexOf(':')+1)
            })
        }) */
    },

    hostTarget(rawMessage:string):{channel:string, host:string} {
        const tempHostArray = rawMessage.split(' :')
        return {
            channel:tempHostArray[0].substring(tempHostArray[0].indexOf('#')),
            host:this.channel(tempHostArray[1].substring(0, tempHostArray[1].indexOf(' ')))
        }
    },

    joinOrPart(rawMessage:string):{username:string, channel:string} {
        return {
            username: rawMessage.substring(1, rawMessage.indexOf('!')),
            channel: rawMessage.substring(rawMessage.indexOf('#')).trimEnd()
        }
    },

    messageType(msg: string):string{
        let start = 0
        let end = msg.indexOf(' ')

        let result = msg.substring(start, end+1)
        while(!result.match(/[A-Z]+ |^[0-9]{3} /)){
            start = end
            end = msg.indexOf(' ', end+1)
            result = msg.substring(start+1, end+1)
        }

        return result.substring(0, result.length - 1)
    },

    roomstateDetails(info:string):{}{
        let roomstate:{[index:string]:any} = {}

        info.substring(1).split(';').forEach(e => {
            let [key, value]:any = e.split("=")

            if(isNumberType(key))
                value = Number(value)
            else if(key === "rituals")
                value = value
            else if(value === "0" || value === "1")
                value = (value === "1") ? true:false

            roomstate[key] = value
        })

        return roomstate
    },

    userinfo(info:string):{}{
        let userinfo:{[index:string]:any} = {}

        info.substring(1).split(';').forEach(e => {
            let [key, value]:any = e.split("=")

            if(isNumberType(key))
                value = Number(value)
            else if(value === "0" || value === "1")
                value = (value === "1") ? true:false
            else if(key === 'system-msg' || key === 'msg-param-sub-plan-name')
                value = value.replace(/\\s/g, " ")
            else if (key === 'msg-param-origin-id')
                value = value.replace(/\\s/g, "-")
            else if (value === "true")
                value = true
            else if (value === "false")
                value = false
            
            userinfo[key] = value
        })

        return userinfo
    }, 

    username:(username:string):string => {
        return username.trim().toLowerCase()
    }
}

let isNumberType = (key:string):boolean => {
    return (key === 'msg-param-cumulative-months')
        || (key === 'msg-param-mass-gift-count')
        || (key === 'msg-param-months')
        || (key === 'msg-param-promo-gift-total')
        || (key === 'msg-param-sender-count')
        || (key === 'msg-param-streak-months')
        || (key === 'msg-param-viewerCount')
        || (key === 'msg-param-selected-count')
        || (key === 'msg-param-sub-benefit-end-month')
        || (key === 'msg-param-total-reward-count')
        || (key === 'msg-param-trigger-amount')
        || (key === 'bits')
        || (key === 'slow')
        || (key === 'followers-only')
        || (key === 'message-id')
}

export default _