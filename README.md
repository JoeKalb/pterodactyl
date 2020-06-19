# Pterodactyl

Deno client for Twitch IRC chat.

## Description

An in-depth paragraph about your project and overview of use.

## Getting Started

### Usage

* Must use [Deno v1.0.3](https://github.com/denoland/deno/releases/tag/v1.0.3) or higher.

### Basic Ping Pong Example

```typescript
import { Client } from "../mod.ts";

const opts = {
    password:'<Twitch OAuth>',
    username:'<Twitch Username>',
    channels:[
        '<channel name>'
    ]
}
const client = new Client(opts)

let handleMessage = (message: {[index:string]:any}) => {
    if(message.text === '!ping')
        client.chat(message.channel, "pong")
}

client.on('chatMessage', handleMessage)

await client.connect()
```

## Authors

Contributors names and contact info

ex. Joseph Kalb 
ex. [@joefishplays](https://twitter.com/joefishplays)

## Version History

* 0.1
    * Initial Release

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

## Acknowledgments

Inspiration, code snippets, etc.
* [tmi.js](https://github.com/tmijs/tmi.js)
* [discord.js](https://discord.js.org/#/)