import _ from "./utils.ts";
import { Client } from "./Client.ts";
import { Message } from "../structures/Message.ts";
import { Notice } from "../structures/Notice.ts";
import { Raid } from "../structures/Raid.ts";
import { Rewardgift } from "../structures/Rewardgift.ts";
import { Roomstate } from "../structures/Roomstate.ts";
import { Sub } from "../structures/Sub.ts";
import { Subgift } from "../structures/Subgift.ts";
import { Submysterygift } from "../structures/Submysterygift.ts";
import { User } from "../structures/User.ts";
import { Whisper } from "../../mod.ts";

const events = {
    '353':(rawMessage:string):{} => {
        let channelJoined:{[index:string]:any} = {}
        
        return channelJoined
    },

    chatMessage:(client:Client, rawMessage:string):{} => {
        let message:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        message = { ..._.userinfo(tempArrayMessage[0]) }

        message['username'] = tempArrayMessage[1]
            .substring(0, tempArrayMessage[1].indexOf('!'))
        message['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf("#"))
        message['text'] = tempArrayMessage[2].trim()

        //return message
        return new Message(client, message)
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

    join:(client:Client, rawMessage:string):User => {
        return new User(client, _.joinOrPart(rawMessage))
    },

    notice:(rawMessage:string):Notice => {
        let tempNoticeObject:{[index:string]:string} = {}

        let tempArrayNotice = rawMessage.split(' :')

        tempNoticeObject['msg-id'] = tempArrayNotice[0]
            .substring(tempArrayNotice[0].indexOf('=')+1)
        tempNoticeObject['channel'] = _.channel(tempArrayNotice[1]
            .substring(tempArrayNotice[1].indexOf('#')))
        tempNoticeObject['message'] = tempArrayNotice[2].trim()

        return new Notice(tempNoticeObject)
    },

    part:(client:Client, rawMessage:string):User => {
        return new User(client, _.joinOrPart(rawMessage))
    },

    raid:(client:Client, usernotice:{[index:string]:any}):Raid => {
        return new Raid(client, usernotice)
    },

    resub:(client:Client, usernotice:{[index:string]:any}):Sub => {
        return new Sub(client, usernotice)
    },

    rewardGift:(client:Client, usernotice:{[index:string]:any}):Rewardgift => {
        return new Rewardgift(client, usernotice)
    },

    roomstate:(rawMessage:string):Roomstate => {
        let roomstate:{[index:string]:any} = {}

        let tempArrayRoomstate = rawMessage.split(' :')

        roomstate = { ..._.roomstateDetails(tempArrayRoomstate[0]) }

        roomstate['channel'] = tempArrayRoomstate[1]
            .substring(tempArrayRoomstate[1].indexOf('#')).trimEnd()

        return new Roomstate(roomstate)
    },

    sub:(client:Client, usernotice:{[index:string]:any}):Sub => {
        return new Sub(client, usernotice)
    },

    subgift:(client:Client, usernotice:{[index:string]:any}):Subgift => {
        return new Subgift(client, usernotice)
    },

    submysterygift:(client:Client, usernotice:{[index:string]:any}):Submysterygift => {
        return new Submysterygift(client, usernotice)
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

    whisper:(client:Client, rawMessage:string):Whisper => {
        let message:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        message = { ..._.userinfo(tempArrayMessage[0]) }

        message['username'] = tempArrayMessage[1]
            .substring(0, tempArrayMessage[1].indexOf('!'))
        message['text'] = tempArrayMessage[2].trim()

        return new Whisper(client, message)
    }
}

export default events