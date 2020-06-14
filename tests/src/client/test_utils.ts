import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import _ from "../../../src/client/utils.ts";

Deno.test("Channel Formatting - already formatted", () => {
    assertEquals(_.channel("#lyrik"), "#lyrik")
})

Deno.test("Channel Formatting - incorrectly formatted", () => {
    assertEquals(_.channel("LYRIK"), "#lyrik")
})

Deno.test("Getting Correct Event Type - 001", () => {
    assertEquals(
        _.messageType(":tmi.twitch.tv 001 botfish5 :Welcome, GLHF!"),
        "001"
    )
})

Deno.test("Getting Correct Event Type - 353", () => {
    assertEquals(
        _.messageType(":botfish5.tmi.twitch.tv 353 botfish5 = #hapabott :botfish5"),
        "353"
    )
})

Deno.test("Getting Correct Event Type - ROOMSTATE", () => {
    assertEquals(
        _.messageType("@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=94662873;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #thethingssheplays"),
        "ROOMSTATE"
    )
})

Deno.test("Getting Correct Event Type - USERSTATE", () => {
    assertEquals(
        _.messageType("@badge-info=subscriber/1;badges=subscriber/0;color=#FF69B4;display-name=BotFish5;emote-sets=0,24223,49906,49907,96952,1261174,300548760,488737509;mod=0;subscriber=1;user-type= :tmi.twitch.tv USERSTATE #hapabott"),
        "USERSTATE"
    )
})