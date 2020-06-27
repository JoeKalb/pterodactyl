import {
    Client,
    Message,
    Notice,
    Sub,
    Subgift,
    Submysterygift,
    User,
    Whisper
    } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";
import { Roomstate } from "../src/structures/Roomstate.ts";

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
        'timthetatman',
        'larkonline',
        'beyondthesummit',
        'a_seagull',
        'seekaysee',
        'littlesiha',
        'novaruu',
        'mischacrossing',
        'smashley',
        'bittie',
        'kaypikefashion',
        'ducksauce',
        'maryjleeee'
    ]
}
const client = new Client(opts)

let handleMessage = (message: Message) => {
    if(message.username === 'joefish5'){
        if(message.text === '!ping')
            message.reply(`PONG`)
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
}

let handleNotice = (notice: Notice) => {
    //console.log(notice)
}

let handleRoomState = (info:Roomstate) => {
    //console.log(info)
}

let handleWhisper = (whisper: Whisper) => {
    if(whisper.username === 'joefish5' && whisper.hasEmotes())
        whisper.send('hallo!')
}

client.on('chat', handleMessage)
client.on('notice', handleNotice)
client.on('roomState', handleRoomState)
client.on('whisper', handleWhisper)

/* client.on('resub', (resub:Sub) => {resub.send(`Hey LunaLyrik! ${resub.system_msg}`)})
client.on('sub', (sub:Sub) => {sub.send(`Hey LunaLyrik! ${sub.system_msg}`)})
client.on('submysterygift', (mysteryGift:Submysterygift) => {mysteryGift.send(`Hey LunaLyrik! ${mysteryGift.system_msg}`)})
client.on('subgift', (subgift:Subgift) => {subgift.send(`Hey LunaLyrik! ${subgift.system_msg}`)}) */

await client.connect()