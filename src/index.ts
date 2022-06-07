require("dotenv").config();

import { Client, Intents, Collection } from "discord.js";

declare module "discord.js" {
    export interface Client {
        slash: Collection<unknown, any>;
    }
} 

const client = new Client({
    shards: 'auto',
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_PRESENCES,
        Intents.FLAGS.GUILD_MEMBERS,
        Intents.FLAGS.GUILD_VOICE_STATES,
        Intents.FLAGS.GUILD_INVITES,
        Intents.FLAGS.GUILD_MESSAGES,
        Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
        Intents.FLAGS.GUILD_MESSAGE_TYPING,
        Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
        Intents.FLAGS.DIRECT_MESSAGE_TYPING,
    ],
});

client.slash = new Collection();

require("./handlers")(client);

(async () => {
    await client.login(process.env.TOKEN);
})();