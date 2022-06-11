import Skoy from'skoy';
import { Client, CommandInteraction, MessageEmbed } from "discord.js";

module.exports = {
  name: 'skoy',
  description: 'นายเองก็เป็นได้นะสก๊อยอ่ะ',
  category: 'miscellaneous',
  botPerms: [],
  options: [
    {
      name: 'text',
      description: 'ใส่ข้อความ',
      type: 3,
      required: true,
    },
  ],
  run: async (interaction: CommandInteraction, client: Client) => {
    try {
      const text: any = interaction.options.getString('text');
      const pasaskoy :any = Skoy.convert(text);
      await interaction.reply(pasaskoy);
    } catch (error) {
      console.log(error)
    }
  },
};
