import { Client, CommandInteraction, MessageEmbed } from "discord.js";

module.exports = {
  name: 'ping',
  description: 'ปิงปอง ปองปิง',
  category: 'miscellaneous',
  botPerms: [],
  run: async (interaction: CommandInteraction, client: Client) => {
    interaction.reply({ content: "pong!", ephemeral: false });
  },
};
