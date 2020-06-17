import { assertEquals } from "https://deno.land/std/testing/asserts.ts";


import events from "../../../src/client/events.ts";

Deno.test("Join Event", () => {
    assertEquals(
        events.join(":gozzy67!gozzy67@gozzy67.tmi.twitch.tv JOIN #taylien"),
        {username:"gozzy67", channel:"#taylien"}
    )
})

Deno.test("Part Event", () => {
    assertEquals(
        events.part(":spoopykitt!spoopykitt@spoopykitt.tmi.twitch.tv PART #taylien"),
        {username:"spoopykitt", channel:"#taylien"}
    )
})