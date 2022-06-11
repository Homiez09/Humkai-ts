import { Client, CommandInteraction, MessageEmbed, SelectMenuInteraction } from 'discord.js';

const langModel = require('../../schemas/langDB');

module.exports = async (client: Client, interaction: CommandInteraction | SelectMenuInteraction) => {
  let lang: string
  const langData = await langModel.findOne({
    id: interaction.guild?.id
  })
  if (!langData) lang = 'th'
  else lang = langData.lang

  const word = require(`../../lang/${lang}.json`)
  // slash Command Handling
  if (interaction.isCommand()) {
    const command = client.slash.get(interaction.commandName);
    command.run(interaction, client, word);
  }


  if (interaction.isSelectMenu()) {
    if (!interaction.guild?.me!.permissions.has('ADMINISTRATOR')) {
      const embed = new MessageEmbed()
        .setColor('RED')
        .setTitle(eval(word.error.botEmbed.title))
        .setDescription(eval(word.error.botEmbed.description2))
        .setFooter(interaction.user.tag, interaction.user.displayAvatarURL());

      return interaction.reply({ embeds: [embed], ephemeral: false });
    }

    if (interaction.customId !== 'member') return;
    let role_ID: string = interaction.values[0];
    await interaction.deferReply({ ephemeral: true });
    const role: any = interaction.guild.roles.cache.get(role_ID);
    const embed: any = new MessageEmbed()
      .setTitle(eval(word.setup.auth.success_embed.title))
      .setDescription(eval(word.setup.auth.success_embed.description))
      .setColor('GREEN');
    
    const getRole: any = interaction.member?.roles
    const memberRole: any = getRole.cache.has(role_ID)

    if (!memberRole) {
      await getRole.add(role);
      interaction.followUp({ embeds: [embed], ephemeral: true });
    }
  }
}