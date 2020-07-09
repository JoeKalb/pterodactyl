import _ from "./utils.ts";
import { Client } from "./Client.ts";

import { Host } from "../structures/Host.ts";
import { Message } from "../structures/Message.ts";
import { Notice } from "../structures/Notice.ts";
import { Roomstate } from "../structures/Roomstate.ts";
import { User } from "../structures/User.ts";
import { Whisper } from "../structures/Whisper.ts";

import {
    Bitbadgetier,
    Communitypayforward,
    Extendsub,
    Giftpaidupgrade,
    Paidprimeupgrade,
    Raid,
    Rewardgift,
    Ritual,
    Standardpayforward,
    Sub,
    Subgift,
    Submysterygift,
    Unraid
    } from "../structures/usernotices/mod.ts";

const events = {
    '353':(rawMessage:string):{} => {
        console.log(rawMessage)
        let channelJoined:{[index:string]:any} = {}
        
        return channelJoined
    },

    bitBadgeTier:(client:Client, usernotice:{[index:string]:any}):Bitbadgetier => {
        return new Bitbadgetier(client, usernotice)
    },

    chatMessage:(client:Client, rawMessage:string):Message => {
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

        tempArrayMessage[0].substring(1).split(';').forEach(e => {
            let [key, value]:any = e.split('=')

            // if banDurationTime is "" it will return -1 to show a permenant ban for the channel
            if(key === "ban-duration")
                value = (value === "") ? -1 :parseInt(value)

            timeoutOrBan[key] = value
        })

        timeoutOrBan['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf('#'))
        timeoutOrBan['username'] = _.username(tempArrayMessage[2])

        return timeoutOrBan
    },

    clearMessage:(rawMessage:string):{} => {
        let messageDeleted:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        let messageDetails = tempArrayMessage[0].substring(1).split(';')
        messageDetails.forEach(e => {
            let [key, value] = e.split('=')
            messageDeleted[key] = value
        })

        messageDeleted['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf('#'))

        messageDeleted['message'] = tempArrayMessage[2].trim()

        messageDeleted['username'] = messageDeleted['login']

        return messageDeleted
    },

    communityPayForward:(client:Client, usernotice:{[index:string]:any}):Communitypayforward => {
        return new Communitypayforward(client, usernotice)
    },

    extendSub:(client:Client, usernotice:{[index:string]:any}):Extendsub => {
        return new Extendsub(client, usernotice)
    },

    giftPaidUpgrade:(client:Client, usernotice:{[index:string]:any}):Giftpaidupgrade => {
        return new Giftpaidupgrade(client, usernotice)
    },

    hostTarget:(client:Client, rawMessage:string):Host => {
        return new Host(client, _.hostTarget(rawMessage))
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

    paidPrimeUpgrade:(client:Client, usernotice:{[index:string]:any}):Paidprimeupgrade => {
        return new Paidprimeupgrade(client, usernotice)
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

    ritual:(client:Client, usernotice:{[index:string]:any}):Ritual => {
        return new Ritual(client, usernotice)
    },

    roomstate:(rawMessage:string):Roomstate => {
        let roomstate:{[index:string]:any} = {}

        let tempArrayRoomstate = rawMessage.split(' :')
        
        roomstate = { ..._.roomstateDetails(tempArrayRoomstate[0]) }

        roomstate['channel'] = tempArrayRoomstate[1]
            .substring(tempArrayRoomstate[1].indexOf('#')).trimEnd()

        return new Roomstate(roomstate)
    },

    standardPayForward:(client:Client, usernotice:{[index:string]:any}):Standardpayforward => {
        return new Standardpayforward(client, usernotice)
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

    unraid:(client:Client, usernotice:{[index:string]:any}):Unraid => {
        return new Unraid(client, usernotice)
    },

    usernotice:(rawMessage:string):{} => {
        let usernotice:{[index:string]:any} = {}

        let tempArrayMessage = rawMessage.split(' :')

        usernotice = { ..._.userinfo(tempArrayMessage[0]) }

        usernotice['username'] = usernotice['login']
        usernotice['channel'] = tempArrayMessage[1]
            .substring(tempArrayMessage[1].indexOf('#')).trimEnd()

        if(tempArrayMessage.length === 3)
            usernotice['message'] = tempArrayMessage[2].trimEnd()

        return usernotice
    }, 

    userstate:(rawMessage:string):{} => {
        let userstate:{[index:string]:string} = {}

        const tempArrayUserstate = rawMessage.split(' :')

        userstate = { ..._.userinfo(tempArrayUserstate[0]) }
        userstate['channel'] = tempArrayUserstate[1]
            .substring(tempArrayUserstate[1].indexOf('#')).trim()
        
        return userstate
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