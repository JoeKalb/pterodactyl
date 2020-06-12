

const _ =  {
    channel(channel: string):string{
        channel = channel.toLocaleLowerCase()

        if(channel[0] !== '#')
            channel = `#${channel}`

        return channel
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

    userinfo(info:string):{}{
        let userinfo:{[index:string]:any} = {}

        info.substring(1).split(';').forEach(e => {
            let [key, value]:any = e.split("=")

            if(isNumberType(key))
                value = Number(value)
            else if(value === "0" || value === "1")
                value = (value === "1") ? true:false
            else if(key === 'system-msg')
                value = value.replace(/\\s/g, " ")
            else if (key === 'msg-param-origin-id')
                value = value.replace(/\\s/g, "-")
            
            userinfo[key] = value
        })

        return userinfo
    }
}

let isNumberType = (key:string):boolean => {
    return (key === 'msg-param-cumulative-months')
        || (key === 'msg-param-months')
        || (key === 'msg-param-promo-gift-total')
        || (key === 'msg-param-streak-months')
        || (key === 'msg-param-viewerCount')
        || (key === 'bits')
        || (key === 'slow')
        || (key === 'followers-only')
}

export default _