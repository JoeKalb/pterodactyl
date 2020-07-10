# Pterodactyl

Deno client for Twitch IRC chat.

![GitHub](https://img.shields.io/github/license/JoeKalb/pterodactyl)
## Getting Started

### Usage

* Must use [Deno v1.0.3](https://github.com/denoland/deno/releases/tag/v1.0.3) or higher.
* If you don't plan on implementing your own OAuth interface you can get the token to authenticate your username [here](https://twitchapps.com/tmi/)

### Basic Ping Pong Example

```typescript
import { 
    Client,
    Message
    } from "https://deno.land/x/pterodactyl/mod.ts";

const opts = {
    password:'<Twitch OAuth>',
    username:'<Twitch Username>',
    channels:[
        '<channel name>'
    ]
}
const client = new Client(opts)

let handleMessage = (message:Message) => {
    if(message.says === '!ping')
        message.reply('pong')
}

client.on('chatMessage', handleMessage)

await client.connect()
```

### Permissions

* allow-net

## Authors

Contributors names and contact info

* [@joefishplays](https://twitter.com/joefishplays)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [tmi.js](https://github.com/tmijs/tmi.js)
* [discord.js](https://discord.js.org/#/)