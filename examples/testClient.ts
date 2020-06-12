import { Client } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const opts = {
    password:config().TWITCH_PASSWORD,
    username:config().TWITCH_USERNAME,
    channels:[
        'thethingssheplays'
    ]
}
const client = new Client(opts)

let handleMessage = (message: {[index:string]:any}) => {
    if(message.text === '!ping')
        client.chat(message.channel, "pong")
}

client.on('chatMessage', handleMessage)
//client.on('resub', (info: {[index:string]:any}) => { console.log(info) })

await client.connect()