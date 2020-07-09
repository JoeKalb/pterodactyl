import {
    Client,
    Message,
    Notice,
    Roomstate,
    Sub,
    Subgift,
    Submysterygift,
    User,
    Whisper
    } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const opts = {
    password:config().TWITCH_PASSWORD,
    username:config().TWITCH_USERNAME,
    channels:[
        'joefish5',
        'thabuttress',
        'botfish5',
        'ashm0nster',
        'lunalyrik',
        'hapabott',
        'larkonline',
        'palmbee',
        'amouranth',
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
        'maryjleeee',
        'yuuie',
        'qtcinderella',
        'laceduplauren',
        'skylias',
        'lindsayelyse',
        'claire',
        'podgie',
        'curvyllama',
        'ms_jewel',
        'kruzadar',
        'raelilblack',
        'alexiaraye',
        'landonorris',
        'livilu4'
    ],
    options:{}
}
const client = new Client(opts)

let handleMessage = async (message: Message) => {

    if(message.says.match(/botfish5/g))
        console.log(message.says)

    if(message.username === 'joefish5'){
        if(message.says === '!ping')
            message.reply(`PONG`)
        else if(message.says === '!join' && message.channel === '#botfish5')
            client.join(message.username)
        else if(message.says === '!mods')
            console.log(await client.mods(message.channel).catch(console.error))
        else if(message.says === '!vips')
            console.log(await client.vips(message.channel).catch(console.error))
        else if (message.says === '!whisper')
            message.whisper('This is a test!')
        else if(message.says.match(/!sendMessage/g)){
            let parse = message.says.split(' ')
            client.chat(parse[1], 'hi im new!')
        }
        else if(message.isMod() && message.channel === '#thabuttress' && message.says === 'BOT')
            message.say('BEEP BOOP')
        else if(message.isMod() && message.channel === '#thabuttress' && message.says === '!marker')
            client.marker(message.channel)
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
        whisper.say('hallo!')
}

client.on('chat', handleMessage)
client.on('notice', handleNotice)
client.on('roomState', handleRoomState)
client.on('whisper', handleWhisper)

await client.connect()