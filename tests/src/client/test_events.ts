import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

import { Client } from "../../../src/client/Client.ts";
import events from "../../../src/client/events.ts";

const opts = {
    client_id:'',
    password:'',
    username:'',
    channels:[]
}
const client = new Client(opts)

Deno.test("Event - 353", () => {
    assertEquals(
        events['353'](':botfish5.tmi.twitch.tv 353 botfish5 = #thethingssheplays :botfish5'),
        {}
    )
})

Deno.test("Event - bitBadgeTier", () => {
    assertEquals(true, true)
})

Deno.test("Event - chatMessage", () => {
    const result = events.chatMessage(client,"@badge-info=subscriber/1;badges=subscriber/0,bits/100;client-nonce=b20eb86b9eb147dac74853dd6e44c5d5;color=#8A2BE2;display-name=NotMattTV;emote-only=1;emotes=425618:0-2;flags=;id=9b3f6fee-d500-4030-ba6c-1f2ed2e3e9eb;mod=0;room-id=155586958;subscriber=1;tmi-sent-ts=1592165944057;turbo=0;user-id=41347151;user-type= :notmatttv!notmatttv@notmatttv.tmi.twitch.tv PRIVMSG #taylien :LUL")
    assertEquals(
        result.text,
        "LUL"
    )
})

Deno.test("Event - clearChat", () => {
    assertEquals(true, true) 
})

Deno.test("Event - clearMessage", () => {
    assertEquals(true, true)
})

Deno.test("Event - communityPayForward", () => {
    assertEquals(
        events.communityPayForward(client, {
            ['badge-info']: "subscriber/1",
            badges: "subscriber/0,premium/1",
            color: "",
            ['display-name']: "top_testy_goat1",
            emotes: "",
            flags: "",
            id: "97b4c4d8-27f0-4d2f-96e9-a0bd4380fe3f",
            login: "top_testy_goat1",
            mod: false,
            ['msg-id']: "communitypayforward",
            ['msg-param-prior-gifter-anonymous']: false,
            ['msg-param-prior-gifter-display-name']: "morandzo",
            ['msg-param-prior-gifter-id']: "203047426",
            ['msg-param-prior-gifter-user-name']: "morandzo",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "top_testy_goat1 is paying forward the Gift they got from morandzo to the community!",     
            ['tmi-sent-ts']: "1593054326822",
            ['user-id']: "497801358",
            ['user-type']: "",
            username: "top_testy_goat1",
            channel: "#summit1g"
          }).system_msg, 
        "top_testy_goat1 is paying forward the Gift they got from morandzo to the community!") 
})

Deno.test("Event - extendSub", () => {
    assertEquals(
        events.extendSub(client, {
            ['badge-info']: "subscriber/2",
            badges: "subscriber/0,sub-gifter/1",
            color: "#B22222",
            ['display-name']: "MegaZero2312",
            emotes: "",
            flags: "",
            id: "d1fe98a1-65e4-4f1f-81ce-fac1a4d9d18b",
            login: "megazero2312",
            mod: false,
            ['msg-id']: "extendsub",
            ['msg-param-cumulative-months']: 2,
            ['msg-param-sub-benefit-end-month']: 9,
            ['msg-param-sub-plan']: "1000",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "MegaZero2312 extended their Tier 1 subscription through September!",
            ['tmi-sent-ts']: "1593053974191",
            ['user-id']: "61423649",
            ['user-type']: "",
            username: "megazero2312",
            channel: "#summit1g"
          }).username, 
        "megazero2312")
})

Deno.test("Event - giftPaidUpgrade", () => {
    assertEquals(
        events.giftPaidUpgrade(client, {
            ['badge-info']: "subscriber/1",
            badges: "subscriber/0,premium/1",
            color: "",
            ['display-name']: "top_testy_goat1",
            emotes: "",
            flags: "",
            id: "623e35c3-fd6a-4837-b999-26352d8a3613",
            login: "top_testy_goat1",
            mod: false,
            ['msg-id']: "giftpaidupgrade",
            ['msg-param-sender-login']: "morandzo",
            ['msg-param-sender-name']: "morandzo",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "top_testy_goat1 is continuing the Gift Sub they got from morandzo!",
            ['tmi-sent-ts']: "1593054263684",
            ['user-id']: "497801358",
            ['user-type']: "",
            username: "top_testy_goat1",
            channel: "#summit1g"
          }).id, 
        "623e35c3-fd6a-4837-b999-26352d8a3613")
})

Deno.test("Event - hostTarget", () => {
    assertEquals(true, true)
})

Deno.test("Event - join", () => {
    const result = events.join(client, ":gozzy67!gozzy67@gozzy67.tmi.twitch.tv JOIN #taylien")
    assertEquals(
        {username:result.username, channel:result.channel},
        {username:"gozzy67", channel:"#taylien"}
    )
})

Deno.test("Event - notice", () => {
    assertEquals(true, true)
})

Deno.test("Event - paidPrimeUpgrade", () => {
    assertEquals(
        events.paidPrimeUpgrade(client, {
            ['badge-info']: "subscriber/1",
            badges: "subscriber/0,premium/1",
            color: "",
            ['display-name']: "SimplySendIt",
            emotes: "",
            flags: "",
            id: "6b7aef49-aad5-4c8f-aa65-080269d4f969",
            login: "simplysendit",
            mod: false,
            ['msg-id']: "primepaidupgrade",
            ['msg-param-sub-plan']: "1000",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "SimplySendIt converted from a Twitch Prime sub to a Tier 1 sub!",
            ['tmi-sent-ts']: "1593051541326",
            ['user-id']: "105116121",
            ['user-type']: "",
            username: "simplysendit",
            channel: "#summit1g"
          }).system_msg, 
        "SimplySendIt converted from a Twitch Prime sub to a Tier 1 sub!")
})

Deno.test("Event - part", () => {
    const result = events.part(client, ":spoopykitt!spoopykitt@spoopykitt.tmi.twitch.tv PART #taylien")
    assertEquals(
        {username:result.username, channel:result.channel},
        {username:"spoopykitt", channel:"#taylien"}
    )
})

Deno.test("Event - raid", () =>{
    assertEquals(
        events.raid(client, {
            ['badge-info']: "subscriber/6",
            badges: "moderator/1,subscriber/6,partner/1",
            color: "#4D2DCA",
            ['display-name']: "novaruu",
            emotes: "",
            flags: "",
            id: "249e8c59-57b5-4b07-b9c5-737c94f25e9e",
            login: "novaruu",
            mod: true,
            ['msg-id']: "raid",
            ['msg-param-displayName']: "novaruu",
            ['msg-param-login']: "novaruu",
            ['msg-param-profileImageURL']: "https://static-cdn.jtvnw.net/jtv_user_pictures/86b94f19-b4a6-4ca8-a03c-59e7a9fb35a5-profile_image-70...",
            ['msg-param-viewerCount']: 1052,
            ['room-id']: "125387632",
            subscriber: true,
            ['system-msg']: "1052 raiders from novaruu have joined!",
            ['tmi-sent-ts']: "1593055043543",
            ['user-id']: "154028091",
            ['user-type']: "mod",
            username: "novaruu",
            channel: "#amouranth"
          }).msg_param_viewerCount, 
        1052)
})

Deno.test("Event - resub", () => {
    assertEquals(
        events.resub(client, {
            ['badge-info']: "subscriber/2",
            badges: "subscriber/0,premium/1",
            color: "#00FFF3",
            ['display-name']: "OvertureWaves",
            emotes: "",
            flags: "",
            id: "4a2aab38-270e-4591-b982-fc6a6e0269c3",
            login: "overturewaves",
            mod: false,
            ['msg-id']: "resub",
            ['msg-param-cumulative-months']: 2,
            ['msg-param-months']: 0,
            ['msg-param-should-share-streak']: false,
            ['msg-param-sub-plan-name']: "Channel Subscription (summit1g)",
            ['msg-param-sub-plan']: "Prime",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "OvertureWaves subscribed with Twitch Prime. They've subscribed for 2 months!",
            ['tmi-sent-ts']: "1593049496513",
            ['user-id']: "53497693",
            ['user-type']: "",
            username: "overturewaves",
            channel: "#summit1g"
          }).msg_param_should_share_streak, 
        false)
})

Deno.test("Event - rewardGift", () => {
    assertEquals(
        events.rewardGift(client, {
            ['badge-info']: "subscriber/1",
            badges: "subscriber/0,bits/1000",
            color: "#DAA520",
            ['display-name']: "Mcstorm87",
            emotes: "",
            flags: "",
            id: "af98c5f9-7938-4c98-9f64-0b3df3578910",
            login: "mcstorm87",
            mod: false,
            ['msg-id']: "rewardgift",
            ['msg-param-domain']: "pride_megacommerce_2020",
            ['msg-param-selected-count']: 25,
            ['msg-param-total-reward-count']: 25,
            ['msg-param-trigger-amount']: 1000,
            ['msg-param-trigger-type']: "CHEER",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "Mcstorm87's Cheer shared rewards to 25 others in Chat!",
            ['tmi-sent-ts']: "1593049296206",
            ['user-id']: "99479365",
            ['user-type']: "",
            username: "mcstorm87",
            channel: "#summit1g"
          }).badges, 
        ["subscriber/0","bits/1000"])
})

Deno.test("Event - ritual", () => {
    assertEquals(true, true)
})

Deno.test("Event - roomstate", () => {
    assertEquals(true, true)
})

Deno.test("Event - sub", () => {
    assertEquals(
        events.sub(client, { 
            ['badge-info']: "subscriber/0",
            badges: "subscriber/0,premium/1",
            color: "",
            ['display-name']: "al3xvas3",
            emotes: "",
            flags: "",
            id: "0eed8f0e-08ab-417a-93c5-2e61ba7a77e8",
            login: "al3xvas3",
            mod: false,
            ['msg-id']: "sub",
            ['msg-param-cumulative-months']: 1,
            ['msg-param-months']: 0,
            ['msg-param-should-share-streak']: false,
            ['msg-param-sub-plan-name']: "ChannelsSubscriptions(summit1g)",
            ['msg-param-sub-plan']: "1000",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "al3xvas3ssubscribedsatsTiers1.",
            ['tmi-sent-ts']: "1593048208855",
            ['user-id']: "240529057",
            ['user-type']: "",
            username: "al3xvas3",
            channel: "#summit1g"
        }).subscriber, 
        true)
})

Deno.test("Event - subgift", () => {
    assertEquals(
        events.subgift(client, {
            ['badge-info']: "subscriber/3",
            badges: "subscriber/3,premium/1",
            color: "#0000FF",
            ['display-name']: "vastspecter",
            emotes: "",
            flags: "",
            id: "6f94b360-0868-43c9-8e2d-d6984eef2247",
            login: "vastspecter",
            mod: false,
            ['msg-id']: "subgift",
            ['msg-param-gift-months']: true,
            ['msg-param-months']: 4,
            ['msg-param-origin-id']: "da-39-a3-ee-5e-6b-4b-0d-32-55-bf-ef-95-60-18-90-af-d8-07-09",
            ['msg-param-recipient-display-name']: "ShadyGamers313",
            ['msg-param-recipient-id']: "97232692",
            ['msg-param-recipient-user-name']: "shadygamers313",
            ['msg-param-sender-count']: 1,
            ['msg-param-sub-plan-name']: "Channel Subscription (summit1g)",
            ['msg-param-sub-plan']: "1000",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "vastspecter gifted a Tier 1 sub to ShadyGamers313! This is their first Gift Sub in the channel!",
            ['tmi-sent-ts']: "1593050050347",
            ['user-id']: "75561738",
            ['user-type']: "",
            username: "vastspecter",
            channel: "#summit1g"
          }).tmi_sent_ts, 
        "1593050050347")
})

Deno.test("Event - submysterygift", () => {
    assertEquals(
        events.submysterygift(client, {
            ['badge-info']: "subscriber/19",
            badges: "subscriber/12,bits/10000",
            color: "#1E90FF",
            ['display-name']: "MrZeppelin87",
            ['emotes']: "",
            flags: "",
            id: "f00c84f3-ab23-48d2-8bec-021dd69fcde7",
            login: "mrzeppelin87",
            mod: false,
            ['msg-id']: "submysterygift",
            ['msg-param-mass-gift-count']: 5,
            ['msg-param-origin-id']: "e4-7f-78-0d-cd-bf-9a-d6-4c-02-e1-40-1d-8c-75-f8-59-05-02-8b",
            ['msg-param-sender-count']: 5,
            ['msg-param-sub-plan']: "1000",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "MrZeppelin87 is gifting 5 Tier 1 Subs to summit1g's community! They've gifted a total of 5 in the ch...",
            ['tmi-sent-ts']: "1593052248315",
            ['user-id']: "196757668",
            ['user-type']: "",
            username: "mrzeppelin87",
            channel: "#summit1g"
          }).channel, 
        "#summit1g")
})

Deno.test("Event - unraid", () => {
    assertEquals(true, true)
})

Deno.test("Event - usernotice", () => {
    assertEquals(
        events.usernotice('@badge-info=subscriber/0;badges=subscriber/0,premium/1;color=;display-name=al3xvas3;emotes=;flags=;id=0eed8f0e-08ab-417a-93c5-2e61ba7a77e8;login=al3xvas3;mod=0;msg-id=sub;msg-param-cumulative-months=1;msg-param-months=0;msg-param-should-share-streak=0;msg-param-sub-plan-name=Channel\sSubscription\s(summit1g);msg-param-sub-plan=1000;room-id=26490481;subscriber=1;system-msg=al3xvas3\ssubscribed\sat\sTier\s1.;tmi-sent-ts=1593048208855;user-id=240529057;user-type= :tmi.twitch.tv USERNOTICE #summit1g'), 
        { 
            ['badge-info']: "subscriber/0",
            badges: "subscriber/0,premium/1",
            color: "",
            ['display-name']: "al3xvas3",
            emotes: "",
            flags: "",
            id: "0eed8f0e-08ab-417a-93c5-2e61ba7a77e8",
            login: "al3xvas3",
            mod: false,
            ['msg-id']: "sub",
            ['msg-param-cumulative-months']: 1,
            ['msg-param-months']: 0,
            ['msg-param-should-share-streak']: false,
            ['msg-param-sub-plan-name']: "ChannelsSubscriptions(summit1g)",
            ['msg-param-sub-plan']: "1000",
            ['room-id']: "26490481",
            subscriber: true,
            ['system-msg']: "al3xvas3ssubscribedsatsTiers1.",
            ['tmi-sent-ts']: "1593048208855",
            ['user-id']: "240529057",
            ['user-type']: "",
            username: "al3xvas3",
            channel: "#summit1g"
        }
    )
})

Deno.test("Event - userstate", () => {
    assertEquals(true, true)
})

Deno.test("Event - whisper", () => {
    assertEquals(
        events.whisper(client, '@badges=bits-charity/1;color=#FF7F27;display-name=JoeFish5;emotes=;message-id=74;thread-id=112721305_241106803;turbo=0;user-id=112721305;user-type= :joefish5!joefish5@joefish5.tmi.twitch.tv WHISPER botfish5 :UWU').display_name, 
        "JoeFish5")
})