import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import _ from "../../../src/client/utils.ts";

Deno.test("utils - Channel Formatting - already formatted", () => {
    assertEquals(_.channel("#lyrik"), "#lyrik")
})

Deno.test("utils - Channel Formatting - incorrectly formatted", () => {
    assertEquals(_.channel("LYRIK"), "#lyrik")
})

Deno.test("utils - emoteBreakdown - empty string", () => {
    assertEquals(
        _.emoteBreakdown(""), 
        [])
})

Deno.test("utils - emoteBreadown - non-empty string", () => {
    assertEquals(
        _.emoteBreakdown("300543100:9-15/302373508:0-7,17-24"),
        ["300543100:9-15","302373508:0-7,17-24"]
    )
})

Deno.test("utils - hostTarget", () => {
    assertEquals(
        _.hostTarget(":tmi.twitch.tv HOSTTARGET #joefish5 :thethingssheplays -"), 
        {
            channel:"#joefish5",
            host:"#thethingssheplays"
        })
})

Deno.test("utils - joinOrPart", () => {
    assertEquals(
        _.joinOrPart(":botfish5!botfish5@botfish5.tmi.twitch.tv JOIN #ashm0nster"), 
        {
            username:"botfish5",
            channel:"#ashm0nster"
        })
})

Deno.test("utils - messageType - 001", () => {
    assertEquals(
        _.messageType(":tmi.twitch.tv 001 botfish5 :Welcome, GLHF!"),
        "001"
    )
})

Deno.test("utils - messageType - 353", () => {
    assertEquals(
        _.messageType(":botfish5.tmi.twitch.tv 353 botfish5 = #hapabott :botfish5"),
        "353"
    )
})

Deno.test("utils - messageType - PRIVMSG", () => {
    assertEquals(
        _.messageType("@badge-info=subscriber/1;badges=subscriber/0,bits/100;client-nonce=b20eb86b9eb147dac74853dd6e44c5d5;color=#8A2BE2;display-name=NotMattTV;emote-only=1;emotes=425618:0-2;flags=;id=9b3f6fee-d500-4030-ba6c-1f2ed2e3e9eb;mod=0;room-id=155586958;subscriber=1;tmi-sent-ts=1592165944057;turbo=0;user-id=41347151;user-type= :notmatttv!notmatttv@notmatttv.tmi.twitch.tv PRIVMSG #taylien :LUL")
        , "PRIVMSG"
    )
})

Deno.test("utils - messageType - ROOMSTATE", () => {
    assertEquals(
        _.messageType("@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=94662873;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #thethingssheplays"),
        "ROOMSTATE"
    )
})

Deno.test("utils - messageType - USERSTATE", () => {
    assertEquals(
        _.messageType("@badge-info=subscriber/1;badges=subscriber/0;color=#FF69B4;display-name=BotFish5;emote-sets=0,24223,49906,49907,96952,1261174,300548760,488737509;mod=0;subscriber=1;user-type= :tmi.twitch.tv USERSTATE #hapabott"),
        "USERSTATE"
    )
})

Deno.test("utils - roomstateDetails", () => {
    assertEquals(
        _.roomstateDetails("@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=112721305;slow=0;subs-only=0"), 
        {
            ['emote-only']:false,
            ['followers-only']:-1,
            r9k:false,
            rituals:"0",
            ['room-id']:"112721305",
            slow:0,
            ['subs-only']:false
        })
})

Deno.test("utils - userinfo", () => {
    assertEquals(
        _.userinfo("@badge-info=subscriber/5;badges=subscriber/3,premium/1;client-nonce=006615db47bc2a54e98ce6b8c7bbc8af;color=#0000FF;display-name=drklucavi;emotes=;flags=;id=a22de78b-f2f4-48c3-b101-54aadb33e9d8;mod=0;room-id=26490481;subscriber=1;tmi-sent-ts=1593204178756;turbo=0;user-id=27813818;user-type="), 
        {
            ['badge-info']:"subscriber/5",
            badges:"subscriber/3,premium/1",
            ['client-nonce']:"006615db47bc2a54e98ce6b8c7bbc8af",
            color:"#0000FF",
            ['display-name']:"drklucavi",
            emotes:"",
            flags:"",
            id:"a22de78b-f2f4-48c3-b101-54aadb33e9d8",
            mod:false,
            ['room-id']:"26490481",
            subscriber:true,
            ['tmi-sent-ts']:"1593204178756",
            turbo:false,
            ['user-id']:"27813818",
            ['user-type']:""
        })
})

Deno.test("utils - username", () => {
    assertEquals(_.username(" JOEFISH5 "), "joefish5")
})