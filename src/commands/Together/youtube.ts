import { Client, CommandInteraction } from 'discord.js';

module.exports = {
  name: 'youtube',
  description: 'มาดูยูทูปนะจ้ะ',
  category: 'Together',
  botPerms: ['ADMINISTRATOR'],
  run: async (interaction: CommandInteraction, client: Client, word: any) => {
    const member: any = interaction.member
    const bot: any = client
    if (!member.voice.channel)
      return interaction.reply(eval(word.youtube.fail));
    {
      bot.together
        .createTogetherCode(member.voice.channel.id, 'youtube')
        .then(async (invite: any) => {
          return interaction.reply(`${invite.code}`);
        });
    }
  },
};
