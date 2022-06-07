require('dotenv').config();

import { REST } from '@discordjs/rest';
import { Routes } from 'discord-api-types/v9';
import { readdirSync } from 'fs';
import path from 'path';

const commands: Array<any> = [];
readdirSync('./src/commands/').map(async (dir: string) => {
  readdirSync(`./src/commands/${dir}`).map(async (cmd: string) => {
    commands.push(require(path.join(__dirname, `./commands/${dir}/${cmd}`)));
  });
});

const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || '');

(async () => {
  try {
    console.log('[SYSTEM] Started refreshing application (/) commands.');
    await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID||''), // Global
      /* Routes.applicationGuildCommands(
        process.env.CLIENT_ID,
        process.env.GUILD_ID,
      ), */
      { body: commands },
    );
    console.log('[SYSTEM] Successfully reloaded application (/) commands.');
  } catch (error) {
    console.log(error);
  }
})();
