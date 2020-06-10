

const _ =  {
    test(): string{
        return 'this is a test'
    },

    formatChannel(channel: string):string{
        channel = channel.toLocaleLowerCase()

        if(channel[0] !== '#')
            channel = `#${channel}`

        return channel
    },

    messageType(msg: string):string{
        let start = 0
        let end = msg.indexOf(' ')

        let result = msg.substring(start, end+1)
        while(!result.match(/[A-Z0-9]+ /)){
            start = end
            end = msg.indexOf(' ', end+1)
            result = msg.substring(start+1, end+1)
        }

        return result.substring(0, result.length - 1)
    }
}

export default _