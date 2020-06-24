import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { Client } from "../../../src/client/Client.ts";
import events from "../../../src/client/events.ts";

import { config } from "https://deno.land/x/dotenv/mod.ts";

const opts = {
    client_id:config().TWITCH_CLIENT_ID,
    password:config().TWITCH_PASSWORD,
    username:config().TWITCH_USERNAME,
    channels:[]
}
const client = new Client(opts)

Deno.test("Event - Join", () => {
    const result = events.join(client, ":gozzy67!gozzy67@gozzy67.tmi.twitch.tv JOIN #taylien")
    assertEquals(
        {username:result.username, channel:result.channel},
        {username:"gozzy67", channel:"#taylien"}
    )
})

Deno.test("Event - Part", () => {
    const result = events.part(client, ":spoopykitt!spoopykitt@spoopykitt.tmi.twitch.tv PART #taylien")
    assertEquals(
        {username:result.username, channel:result.channel},
        {username:"spoopykitt", channel:"#taylien"}
    )
})