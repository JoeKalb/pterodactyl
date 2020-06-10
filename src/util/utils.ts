

const _ =  {
    test(): string{
        return 'this is a test'
    },

    formatChannel(channel: string):string{
        channel = channel.toLocaleLowerCase()

        if(channel[0] !== '#')
            channel = `#${channel}`

        return channel
    }
}

export default _