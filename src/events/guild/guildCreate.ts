import { Client } from 'discord.js';

module.exports = async (client: Client, guild:any) => {
  client.users.fetch(process.env.OWNER_ID|| '').then((user) => {
    user.send(
      `✅ บอทเข้าสู่เซิฟ ${guild.name} (${guild.id}, ${guild.ownerId})`,
    );
  });
};
