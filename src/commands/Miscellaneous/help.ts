import { CommandInteraction, Client, MessageEmbed, Collection } from 'discord.js';

declare module "discord.js" {
  export interface Client {
      slash: Collection<unknown, any>;
  }
} 

module.exports = {
  name: 'help',
  description: 'ดูคำสั่งทั้งหมด',
  category: 'miscellaneous',
  botPerms: [],
  run: async (interaction: CommandInteraction, client: Client) => {
    const categories = new Set(client.slash.map((c) => c.category));
    //console.log(categories);
    const image:any = client.user?.displayAvatarURL()
    const embed = new MessageEmbed()
      .setColor('BLUE')
      .setTitle(`${client.user?.username}'s Help`)
      .setDescription('**/ Slash Command List **')
      .setFooter(
        `request by ${interaction.user.tag}`,
        interaction.user.displayAvatarURL(),
      )
      .setThumbnail(image);
    for (const category of categories) {
      const commands = client.slash.filter((c) => c.category === category);
      embed.addField(
        `${category}`,
        `${commands.map((c) => `\`${c.name}\``).join(', ')}`,
      );
    }
    await interaction.reply({
      embeds: [embed],
    });
  },
};
