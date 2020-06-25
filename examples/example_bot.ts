import {
    Client,
    Message,
    Notice,
    User,
    Whisper
    } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const opts = {
    client_id:config().TWITCH_CLIENT_ID,
    password:config().TWITCH_PASSWORD,
    username:config().TWITCH_USERNAME,
    channels:[
        'joefish5',
        'botfish5',
        'ashm0nster',
        'lunalyrik',
        'hapabott',
        'larkonline',
        'palmbee',
        'amouranth',
        'thabuttress',
        'thethingssheplays',
        'summit1g',
        'timthetatman'
    ]
}
const client = new Client(opts)

let handleMessage = (message: Message) => {
    if(message.text === '!ping')
        message.reply("hapaboD ")
    else if(message.text === '!join' && message.channel === '#botfish5'){
        client.join(message.username)
    }
    else if(message.username === 'joefish5' && message.text === '!mods')
        client.mods(message.channel)
    else if (message.username === 'joefish5' && message.text === '!whisper')
        message.whisper('This is a test!')
    else if(message.username === 'joefish5' && message.text.match(/!sendMessage/g)){
        let parse = message.text.split(' ')
        client.chat(parse[1], 'hi im new!')
    }
}

let handleNotice = (notice: Notice) => {
    //console.log(notice)
}

let handleWhisper = (whisper: Whisper) => {
    if(whisper.username === 'joefish5' && whisper.hasEmotes())
        whisper.send('hallo!')
}

client.on('chat', handleMessage)
client.on('notice', handleNotice)
client.on('whisper', handleWhisper)
//client.on('resub', (info: {[index:string]:any}) => { console.log(info) })

await client.connect()