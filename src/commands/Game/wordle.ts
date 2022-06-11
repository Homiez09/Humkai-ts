import { Client, CommandInteraction, MessageEmbed } from 'discord.js';

const wordleModel = require('../../schemas/wordleDB');
const channelModel = require('../../schemas/channelDB');
const { WORDS } = require('../../utils/wordlist');

module.exports = {
  name: 'wordle',
  description: 'play wordle',
  category: 'Game',
  botPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'options',
      description: 'start or end',
      type: 3,
      required: true,
      choices: [
        {
          name: 'start',
          value: 'start',
        },
        {
          name: 'end',
          value: 'end',
        },
      ],
    },
  ],
  run: async (interaction: CommandInteraction, client: Client, word: any) => {
    const { options } = interaction;
    const Sub: string = options.getString('options')!;

    switch (Sub) {
      case 'start':
        {
          let channelData;
          try {
            channelData = await channelModel.findOne({
              guild_ID: interaction.guild?.id,
            });
            if (!channelData)
              return interaction.reply(eval(word.wordle.content1));
            if (channelData.wordle_ID !== interaction.channel?.id)
              return interaction.reply(eval(word.wordle.content2));
          } catch (err) {
            console.log(err);
          }

          let wordleData;
          try {
            wordleData = await wordleModel.findOne({
              user_ID: interaction.user.id,
            });
            if (!wordleData) {
              wordleData = await wordleModel.create({
                user_ID: interaction.user.id,
              });
            }
          } catch (err) {
            console.log(err);
          }

          if (wordleData.working)
            return interaction.reply(eval(word.wordle.content3));
          let wordRandom = WORDS[Math.floor(Math.random() * WORDS.length)];
          await wordleModel.findOneAndUpdate(
            { user_ID: interaction.user.id },
            { word: wordRandom, working: true },
          );

          await interaction.reply({
            embeds: [
              await new MessageEmbed()
                .setTitle(`Day ${wordleData.day}`)
                .addField('Wordle Game', '```_ _ _ _ _```')
                .setColor('#0099ff')
                .setFooter(
                  `Requested by ${interaction.user.tag}`,
                  interaction.user.displayAvatarURL(),
                ),
            ],
          });
        }
        break;
      case 'end':
        {
          let channelData;
          try {
            channelData = await channelModel.findOne({
              guild_ID: interaction.guild?.id,
            });
            if (!channelData)
              return interaction.reply(eval(word.wordle.content1));
            if (channelData.wordle_ID !== interaction.channel?.id)
              return interaction.reply(eval(word.wordle.content2));
          } catch (err) {
            console.log(err);
          }

          let wordleData;
          try {
            wordleData = await wordleModel.findOne({
              user_ID: interaction.user.id,
            });
            if (!wordleData) {
              wordleData = await wordleModel.create({
                user_ID: interaction.user.id,
              });
            }
          } catch (err) {
            console.log(err);
          }

          if (!wordleData.working)
            return await interaction.reply(eval(word.wordle.content5));
          wordleData = await wordleModel.findOneAndUpdate(
            { user_ID: interaction.user.id },
            { working: false },
          );
          await interaction.reply(eval(word.wordle.content4));
        }
        break;
    }
  },
};
