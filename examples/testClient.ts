import { Client } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const opts = {
    password:config().TWITCH_PASSWORD,
    username:config().TWITCH_USERNAME,
    channels:[
        'joefish5',
        'botfish5',
        'taylien'
    ]
}
const client = new Client(opts)

let handleMessage = (message: {[index:string]:any}) => {
    console.log(message)
    if(message.text === '!ping')
        client.chat(message.channel, "pong")
    else if(message.text === '!join' && message.channel === '#botfish5'){
        client.join(message.username)
    }
    else if(message.username === 'joefish5' && message.text === '!mods')
        client.mods(message.channel)
    else if (message.username === 'joefish5' && message.text === '!whisper')
        client.whisper(message.username, 'this is a test!')
    else if(message.username === 'joefish5' && message.text.match(/!sendMessage/g)){
        let parse = message.text.split(' ')
        client.chat(parse[1], 'hi im new!')
    }
}

let handleWhisper = (message: {[index:string]:any}) => {
    if(message.username === 'joefish5')
        client.whisper(message.username, 'hmmmmm')
}

client.on('chat', handleMessage)
client.on('whisper', handleWhisper)
//client.on('resub', (info: {[index:string]:any}) => { console.log(info) })

await client.connect()