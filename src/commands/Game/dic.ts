import { Client, CommandInteraction, MessageEmbed } from 'discord.js';

const { WORDS } = require('../../utils/wordlist');

module.exports = {
  name: 'wordle-search',
  description: 'คำศัพท์ที่อยู่ในเกม wordle',
  category: 'Game',
  botPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'search',
      description: 'ค้นหาคำศัพท์',
      type: 3,
      required: true,
    },
  ],
  run: async (interaction: CommandInteraction, client: Client) => {
    const search = interaction.options.getString('search');

    const filter = (letter: string) => {
      var results = [];
      var len = WORDS.length;
      for (var i = 0; i < len; i++) {
        if (WORDS[i].startsWith(letter)) {
          results.push(WORDS[i]);
        }
      }
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle(`ผลการค้นหา "${search}"`)
        .setFooter(
          `request by ${interaction.user.tag}`,
          interaction.user.displayAvatarURL(),
        );
      if (results.length > 0) {
        for (const word of results) {
          embed.setDescription(results.map((f) => `\`${f}\``).join(', '));
        }
      } else {
        embed.setDescription(`ไม่เจอ ${search} ในระบบ`);
      }
      return embed;
    };

    await interaction.reply({
      embeds: [filter(search!)],
    });
  },
};
