import _ from "./utils.ts";

const events = {
    chatMessage:(rawMessage:string):{} => {
        let message:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        message = { ..._.userinfo(tempArrayMessage[0]) }

        message['username'] = tempArrayMessage[1]
            .substring(0, tempArrayMessage[1].indexOf('!'))
        message['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf("#"))
        message['text'] = tempArrayMessage[2].trim()

        return message
    },

    clearChat:(rawMessage:string):{} => {
        let timeoutOrBan:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        // if banDurationTime is "" it will return -1 to show a permenant ban for the channel 
        let [banDurationName, banDurationTime] = tempArrayMessage[0].substring(1).split('=')
        timeoutOrBan[banDurationName] = (banDurationTime === "")? -1 : parseInt(banDurationTime)

        timeoutOrBan['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf('#'))
        timeoutOrBan['username'] = _.username(tempArrayMessage[2])

        return timeoutOrBan
    },

    clearMessage:(rawMessage:string):{} => {
        let messageDeleted:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        let messageDetails = tempArrayMessage[0].split(';')
        messageDetails.forEach(e => {
            let [key, value] = e.split('=')
            messageDeleted[key] = value
        })

        messageDeleted['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf('#'))

        messageDeleted['message'] = tempArrayMessage[2].trim()

        return messageDeleted
    },

    roomstate:(rawMessage:string):{} => {
        let roomstate:{[index:string]:any} = {}

        let tempArrayRoomstate = rawMessage.split(' :')

        roomstate = { ..._.roomstateDetails(tempArrayRoomstate[0]) }

        roomstate['channel'] = tempArrayRoomstate[1]
            .substring(tempArrayRoomstate[1].indexOf('#'))

        return roomstate
    },

    usernotice:(rawMessage:string):{} => {
        let usernotice:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        usernotice = { ..._.userinfo(tempArrayMessage[0]) }

        usernotice['username'] = usernotice['login']
        usernotice['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf("#")).trim()

        if(tempArrayMessage.length === 3)
            usernotice['message'] = tempArrayMessage[2].trim()

        return usernotice
    }, 

    whisper:(rawMessage:string):{} => {
        let message:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        message = { ..._.userinfo(tempArrayMessage[0]) }

        message['username'] = tempArrayMessage[1]
            .substring(0, tempArrayMessage[1].indexOf('!'))
        message['text'] = tempArrayMessage[2].trim()

        return message
    }
}

export default events