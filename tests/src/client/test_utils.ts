import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import _ from "../../../src/client/utils.ts";

Deno.test("utils - Channel Formatting - already formatted", () => {
    assertEquals(_.channel("#lyrik"), "#lyrik")
})

Deno.test("utils - Channel Formatting - incorrectly formatted", () => {
    assertEquals(_.channel("LYRIK"), "#lyrik")
})

Deno.test("utils - Getting Correct Event Type - 001", () => {
    assertEquals(
        _.messageType(":tmi.twitch.tv 001 botfish5 :Welcome, GLHF!"),
        "001"
    )
})

Deno.test("utils - Getting Correct Event Type - 353", () => {
    assertEquals(
        _.messageType(":botfish5.tmi.twitch.tv 353 botfish5 = #hapabott :botfish5"),
        "353"
    )
})

Deno.test("utils - Getting Correct Event Type - PRIVMSG", () => {
    assertEquals(
        _.messageType("@badge-info=subscriber/1;badges=subscriber/0,bits/100;client-nonce=b20eb86b9eb147dac74853dd6e44c5d5;color=#8A2BE2;display-name=NotMattTV;emote-only=1;emotes=425618:0-2;flags=;id=9b3f6fee-d500-4030-ba6c-1f2ed2e3e9eb;mod=0;room-id=155586958;subscriber=1;tmi-sent-ts=1592165944057;turbo=0;user-id=41347151;user-type= :notmatttv!notmatttv@notmatttv.tmi.twitch.tv PRIVMSG #taylien :LUL")
        , "PRIVMSG"
    )
})

Deno.test("utils - Getting Correct Event Type - ROOMSTATE", () => {
    assertEquals(
        _.messageType("@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=94662873;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #thethingssheplays"),
        "ROOMSTATE"
    )
})

Deno.test("utils - Getting Correct Event Type - USERSTATE", () => {
    assertEquals(
        _.messageType("@badge-info=subscriber/1;badges=subscriber/0;color=#FF69B4;display-name=BotFish5;emote-sets=0,24223,49906,49907,96952,1261174,300548760,488737509;mod=0;subscriber=1;user-type= :tmi.twitch.tv USERSTATE #hapabott"),
        "USERSTATE"
    )
})