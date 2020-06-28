import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import commands from "../../../src/client/commands.ts";

Deno.test("Command - ban", () => {
    assertEquals(
        commands.ban("#thabuttress", "annoying", "this person is annoying"),
        "PRIVMSG #thabuttress :/ban annoying this person is annoying")
})

Deno.test("Command - chat - Correctly formatted", () => {
    assertEquals(commands.chat("#timthetatman", "TIM"), "PRIVMSG #timthetatman :TIM")
})

Deno.test("Command - chat - Channel Format Changed", () => {
    assertEquals(commands.chat("TimTheTatMan", "TIM"), "PRIVMSG #timthetatman :TIM")
})

Deno.test("Command - clear", () => {
    assertEquals(
        commands.clear("Ms_Jewel"),
        "PRIVMSG #ms_jewel :/clear"
    )
})

Deno.test("Command - color", () => {
    assertEquals(commands.color("#fff"), "PRIVMSG #twitch :/color #fff")
})

Deno.test("Command - commercial (less than 30)", () => {
    assertEquals(
        commands.commercial("#lunalyrik", 5),
        "PRIVMSG #lunalyrik :/commercial 30"
    )
})

Deno.test("Command - commercial (60 seconds)", () => {
    assertEquals(
        commands.commercial("#timthetatman", 60),
        "PRIVMSG #timthetatman :/commercial 60"
    )
})

Deno.test("Command - deleteMessage", () => {
    assertEquals(
        commands.deleteMessage("#moonmoon", "f31d8ed3-3401-40a6-b8dc-6902fa552a76"),
        "PRIVMSG #moonmoon :/delete f31d8ed3-3401-40a6-b8dc-6902fa552a76"
    )
})

Deno.test("Command - emoteOnly", () => {
    assertEquals(commands.emoteOnly("#thethingssheplays"), "PRIVMSG #thethingssheplays :/emoteonly")
})

Deno.test("Command - emoteOnlyOff", () => {
    assertEquals(commands.emoteOnlyOff("#beyondthesummit"), "PRIVMSG #beyondthesummit :/emoteonlyoff")
})

Deno.test("Command - followers", () => {
    assertEquals(
        commands.followers("hapabott", 5),
        "PRIVMSG #hapabott :/followers 5"
    )
})

Deno.test("Command - followersOff", () => {
    assertEquals(commands.followersOff("#kaatniip"), "PRIVMSG #kaatniip :/followersoff")
})

Deno.test("Command - help", () => {
    assertEquals(commands.help("#ms_jewel"), "PRIVMSG #ms_jewel :/help")
})

Deno.test("Command - host", () => {
    assertEquals(commands.host("bittie", "MopGarden"), "PRIVMSG #bittie :/host mopgarden")
})

Deno.test("Command - marker", () => {
    assertEquals(commands.marker("thabuttress"), "PRIVMSG #thabuttress :/marker")
})

Deno.test("Command - me", () => {
    assertEquals(
        commands.me("#twitch", "hi. im new here"),
        "PRIVMSG #twitch :/me hi. im new here"
    )
})

Deno.test("Command - mod", () => {
    assertEquals(
        commands.mod("taylien", "BotFish5"),
        "PRIVMSG #taylien :/mod botfish5"
    )
})

Deno.test("Command - mods", () => {
    assertEquals(commands.mods("#moonmoon"), "PRIVMSG #moonmoon :/mods")
})

Deno.test("Command - r9kbeta", () => {
    assertEquals(commands.r9kbeta("SashaGrey"), "PRIVMSG #sashagrey :/r9kbeta")
})

Deno.test("Command - r9kbetaOff", () => {
    assertEquals(commands.r9kbetaOff("TheThingsShePlays"), "PRIVMSG #thethingssheplays :/r9kbetaoff")
})

Deno.test("Command - raid", () => {
    assertEquals(
        commands.raid("lunalyrik", "kaatniip"),
        "PRIVMSG #lunalyrik :/raid kaatniip"
    )
})

Deno.test("Command - slow", () => {
    assertEquals(
        commands.slow("twitch", 30),
        "PRIVMSG #twitch :/slow 30"
    )
})

Deno.test("Command - slowOff", () => {
    assertEquals(commands.slowOff("adorablestars"), "PRIVMSG #adorablestars :/slowoff")
})

Deno.test("Command - subscribers", () => {
    assertEquals(
        commands.subscribers("adeptthebest"),
        "PRIVMSG #adeptthebest :/subscribers"
    )
})

Deno.test("Command - subscribersOff", () => {
    assertEquals(
        commands.subscribersOff("botfish5"),
        "PRIVMSG #botfish5 :/subscribersoff"
    )
})

Deno.test("Command - timeout", () => {
    assertEquals(
        commands.timeout("thethingssheplays", "nightbot", 60, "STOP SPAMMING!"),
        "PRIVMSG #thethingssheplays :/timeout nightbot 60 STOP SPAMMING!"
    )
})

Deno.test("Command - unban", () => {
    assertEquals(commands.unban("twitch", "mixer"), "PRIVMSG #twitch :/unban mixer")
})

Deno.test("Command - unhost", () => {
    assertEquals(
        commands.unhost("JoeFish5"),
        "PRIVMSG #joefish5 :/unhost"
    )
})

Deno.test("Command - unmod", () => {
    assertEquals(
        commands.unmod("thethingssheplays", "botfish5"),
        "PRIVMSG #thethingssheplays :/unmod botfish5"
    )
})

Deno.test("Command - unraid", () => {
    assertEquals(
        commands.unraid("Kaatniip"),
        "PRIVMSG #kaatniip :/unraid"
    )
})

Deno.test("Command - untimeout", () => {
    assertEquals(
        commands.untimeout("#thabuttress", "Popthatbabymaker"),
        "PRIVMSG #thabuttress :/untimeout popthatbabymaker"
    )
})

Deno.test("Command - unvip", () => {
    assertEquals(
        commands.unvip("#Kaatniip", "BotFish5"),
        "PRIVMSG #kaatniip :/unvip botfish5"
    )
})

Deno.test("Command - vip", () => {
    assertEquals(
        commands.vip("COOP3R", "chrisofbodom"),
        "PRIVMSG #coop3r :/vip chrisofbodom"
    )
})

Deno.test("Command - vips", () => {
    assertEquals(commands.vips("#thabuttress"), "PRIVMSG #thabuttress :/vips")
})

Deno.test("Command - whisper", () => {
    assertEquals(commands.whisper("MOONMOON", "hi dad"), "PRIVMSG #twitch :/w moonmoon hi dad")
})