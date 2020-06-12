import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import _ from "../../../src/client/utils.ts";

Deno.test("Channel Formatting - already formatted", () => {
    assertEquals(_.channel("#lyrik"), "#lyrik")
})

Deno.test("Channel Formatting - incorrectly formatted", () => {
    assertEquals(_.channel("LYRIK"), "#lyrik")
})

Deno.test("Getting Correct Event Type - ROOMSTATE", () => {
    assertEquals(
        _.messageType("@emote-only=0;followers-only=-1;r9k=0;rituals=0;room-id=94662873;slow=0;subs-only=0 :tmi.twitch.tv ROOMSTATE #thethingssheplays"),
        "ROOMSTATE"
    )
})