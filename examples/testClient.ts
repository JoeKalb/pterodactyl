import { Client } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const opts = {
    password:config().TWITCH_PASSWORD,
    username:config().TWITCH_USERNAME,
    channels:[
        'hapabott',
        'botfish5'
    ]
}
const client = new Client(opts)

let handleMessage = (message: {[index:string]:any}) => {
    if(message.text === '!ping')
        client.chat(message.channel, "pong")
    else if(message.text === '!join' && message.channel === '#botfish5'){
        client.join(message.username)
    }
    else if(message.text === '!part'){
        console.log(message)
        client.part(message.channel)
    }
}

let handleWhisper = (message: {[index:string]:any}) => {
    if(message.username === 'joefish5')
        console.log(message)
}

client.on('chatMessage', handleMessage)
client.on('whisper', handleWhisper)
//client.on('resub', (info: {[index:string]:any}) => { console.log(info) })

await client.connect()