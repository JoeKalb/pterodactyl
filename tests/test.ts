import { Emitter } from "https://deno.land/x/event_kit/mod.ts";

const emitter = new Emitter();

// Subscribe to this event
emitter.on("did-change-name", (name: string) => {
  console.log(name);
});

// Trigger the event
emitter.emit("did-change-name", "david");

// Remove the emitter instance
emitter.dispose();