import { Client } from "../mod.ts";
import { config } from "https://deno.land/x/dotenv/mod.ts";

const opts = {
    password:config().TWITCH_PASSWORD,
    username:config().TWITCH_USERNAME,
    channels:[
        'thabuttress'
    ]
}
const client = new Client(opts)

let handleMessage = (details: {}) => {
    //console.log(details)
}

client.on('chatMessage', handleMessage)

await client.connect()