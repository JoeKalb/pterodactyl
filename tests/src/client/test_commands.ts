import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import commands from "../../../src/client/commands.ts";

Deno.test("Basic Chat Message", () => {
    assertEquals(commands.chat("#timthetatman", "TIM"), "PRIVMSG #timthetatman :TIM")
})

Deno.test("Chat Message - Channel Format Changed", () => {
    assertEquals(commands.chat("TimTheTatMan", "TIM"), "PRIVMSG #timthetatman :TIM")
})

Deno.test("Whisper Message", () => {
    assertEquals(commands.whisper("MOONMOON", "hi dad"), "PRIVMSG \w moonmoon hi dad")
})