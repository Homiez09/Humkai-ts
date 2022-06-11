import { Client, CommandInteraction, MessageActionRow, MessageEmbed, MessageSelectMenu, MessageAttachment } from "discord.js";

const channelModel = require('../../schemas/channelDB');
const langModel = require('../../schemas/langDB');

module.exports = {
  name: 'setup',
  description: 'ตั้งค่าความปลอดภัย',
  category: 'Moderator',
  userPerms: ['ADMINISTRATOR'],
  botPerms: ['ADMINISTRATOR'],
  options: [
    {
      name: 'language',
      description: 'Set server language.',
      type: 1,
      options: [
        {
          name: 'select',
          description: 'Select language.',
          type: 3,
          required: true,
          choices: [
            {
              name: 'thai',
              value: 'th',
            },
            {
              name: 'english',
              value: 'en',
            },
          ],
        },
      ],
    },
    {
      name: 'auth',
      description: 'set server auth.',
      type: 1,
      options: [
        {
          name: 'options',
          description: 'confirm?',
          type: 3,
          required: true,
          choices: [
            {
              name: 'about',
              value: 'about',
            },
            {
              name: 'confirm',
              value: 'confirm',
            },
          ],
        },
      ],
    },
    {
      name: 'create-voice',
      description: 'Join to create voice channel.',
      type: 1,
      options: [
        {
          name: 'options',
          description: 'confirm?',
          type: 3,
          required: true,
          choices: [
            {
              name: 'about',
              value: 'about',
            },
            {
              name: 'confirm',
              value: 'confirm',
            },
          ],
        },
      ],
    },
    {
      name: 'remove-background',
      description: 'Remove background.',
      type: 1,
      options: [
        {
          name: 'options',
          description: 'confirm?',
          type: 3,
          required: true,
          choices: [
            {
              name: 'about',
              value: 'about',
            },
            {
              name: 'confirm',
              value: 'confirm',
            },
          ],
        },
      ],
    },
    {
      name: 'wordle-game',
      description: 'Wordle Game.',
      type: 1,
      options: [
        {
          name: 'options',
          description: 'confirm?',
          type: 3,
          required: true,
          choices: [
            {
              name: 'about',
              value: 'about',
            },
            {
              name: 'confirm',
              value: 'confirm',
            },
          ],
        },
      ],
    },
  ],
  run: async (interaction: CommandInteraction, client: Client, word: any) => {
    const { options } = interaction;
    const Sub = options.getSubcommand();

    switch (Sub) {
      case 'wordle-game':
        {
          const choice = options.getString('options');

          switch (choice) {
            case 'about':
              {
                const embed = await new MessageEmbed()
                  .setColor('RED')
                  .setTitle(eval(word.setup.wordle_game.about.title))
                  .setDescription(
                    eval(word.setup.wordle_game.about.description),
                  )
                  .setFooter(
                    `Requested by ${interaction.user.tag}`,
                    interaction.user.displayAvatarURL(),
                  );
                const attachment = new MessageAttachment(
                  './src/assets/images/about.wordle.png',
                );
                interaction.reply({ files: [attachment], embeds: [embed] });
              }
              break;
            case 'confirm': {
              await interaction.deferReply();
              let channelData;
              try {
                channelData = await channelModel.findOne({
                  guild_ID: interaction.guild?.id,
                });
                if (!channelData) {
                  channelData = await channelModel.create({
                    guild_ID: interaction.guild?.id,
                  });
                }
              } catch (e) {
                console.log(e);
              }

              let category = await interaction.guild?.channels.create(
                "Humkau's wordle",
                {
                  type: 'GUILD_CATEGORY',
                },
              );

              let channel = await interaction.guild?.channels.create(
                'play_wordle',
                {
                  type: 'GUILD_TEXT',
                  parent: category,
                },
              );

              await channelModel.findOneAndUpdate(
                { guild_ID: interaction.guild?.id },
                { wordle_ID: channel?.id },
              );

              await interaction.editReply({
                embeds: [
                  await new MessageEmbed()
                    .setTitle(eval(word.setup.wordle_game.embed_confirm.title))
                    .addField(
                      'Remove Background',
                      eval(word.setup.wordle_game.embed_confirm.field),
                    )
                    .setColor('#0099ff')
                    .setFooter(
                      `Requested by ${interaction.user.tag}`,
                      interaction.user.displayAvatarURL(),
                    ),
                ],
              });
            }
          }
        }
        break;
      case 'remove-background':
        {
          const choice = options.getString('options');

          switch (choice) {
            case 'about':
              {
                const embed = await new MessageEmbed()
                  .setColor('RED')
                  .setTitle(eval(word.setup.remove_background.about.title))
                  .setDescription(
                    eval(word.setup.remove_background.about.description),
                  )
                  .setFooter(
                    `Requested by ${interaction.user.tag}`,
                    interaction.user.displayAvatarURL(),
                  );
                const attachment = new MessageAttachment(
                  './src/assets/images/about.rebg.png',
                );
                interaction.reply({ files: [attachment], embeds: [embed] });
              }
              break;
            case 'confirm':
              {
                await interaction.deferReply();
                let channelData;
                try {
                  channelData = await channelModel.findOne({
                    guild_ID: interaction.guild?.id,
                  });
                  if (!channelData) {
                    channelData = await channelModel.create({
                      guild_ID: interaction.guild?.id,
                    });
                  }
                } catch (e) {
                  console.log(e);
                }

                let category = await interaction.guild?.channels.create(
                  'rebg by humkai',
                  {
                    type: 'GUILD_CATEGORY',
                  },
                );

                let channel = await interaction.guild?.channels.create(
                  'removebg',
                  {
                    type: 'GUILD_TEXT',
                    parent: category,
                  },
                );

                channelData = await channelModel.findOneAndUpdate(
                  { guild_ID: interaction.guild?.id },
                  { remove_ID: channel?.id },
                );

                await interaction.editReply({
                  embeds: [
                    await new MessageEmbed()
                      .setTitle(
                        eval(word.setup.remove_background.embed_confirm.title),
                      )
                      .addField(
                        'Remove Background',
                        eval(word.setup.remove_background.embed_confirm.field),
                      )
                      .setColor('#0099ff')
                      .setFooter(
                        `Requested by ${interaction.user.tag}`,
                        interaction.user.displayAvatarURL(),
                      ),
                  ],
                });
              }
              break;
          }
        }
        break;
      case 'create-voice':
        {
          const choice = options.getString('options');

          switch (choice) {
            case 'about':
              {
                const embed = await new MessageEmbed()
                  .setColor('RED')
                  .setTitle(eval(word.setup.create_voice.about.title))
                  .setDescription(
                    eval(word.setup.create_voice.about.description),
                  )
                  .setFooter(
                    `Requested by ${interaction.user.tag}`,
                    interaction.user.displayAvatarURL(),
                  );
                const attachment = new MessageAttachment(
                  './src/assets/images/about.voice.png',
                );
                interaction.reply({ files: [attachment], embeds: [embed] });
              }
              break;
            case 'confirm':
              {
                await interaction.deferReply();
                let channelData;
                try {
                  channelData = await channelModel.findOne({
                    guild_ID: interaction.guild?.id,
                  });
                  if (!channelData) {
                    channelData = await channelModel.create({
                      guild_ID: interaction.guild?.id,
                    });
                  }
                } catch (e) {
                  console.log(e);
                }

                let category = await interaction.guild?.channels.create(
                  'voice by humkai',
                  {
                    type: 'GUILD_CATEGORY',
                  },
                );

                let channel = await interaction.guild?.channels.create(
                  'Join To Create',
                  {
                    type: 'GUILD_VOICE',
                    parent: category,
                  },
                );

                channelData = await channelModel.findOneAndUpdate(
                  { guild_ID: interaction.guild?.id },
                  { voice_ID: channel?.id },
                );
                await interaction.editReply({
                  embeds: [
                    await new MessageEmbed()
                      .setTitle(
                        eval(word.setup.create_voice.embed_confirm.title),
                      )
                      .addField(
                        'create-voice',
                        eval(word.setup.create_voice.embed_confirm.field),
                      ),
                  ],
                });
              }
              break;
          }
        }
        break;
      case 'language':
        {
          const choice = options.getString('select');

          const lang = await langModel.findOne({ id: interaction.guild?.id });
          if (!lang) {
            await langModel.create({
              id: interaction.guild?.id,
              lang: choice,
            });
          } else {
            await langModel.updateOne(
              { id: interaction.guild?.id },
              {
                $set: {
                  lang: choice,
                },
              },
            );
          }

          const wordfast = require(`../../lang/${choice}.json`);
          const embed = new MessageEmbed()
            .setTitle(eval(wordfast.setup.lang.embed.title))
            .setDescription(eval(wordfast.setup.lang.embed.description));

          interaction.reply({ embeds: [embed], ephemeral: false });
        }
        break;
      case 'auth':
        {
          const choice = options.getString('options');
          const everyoneRole = interaction.guild?.roles.everyone;
          switch (choice) {
            case 'confirm':
              {
                await interaction.deferReply();
                // สร้าง "verify" role
                let role: any = await interaction.guild?.roles.create({
                  name: 'verify',
                  color: '#7cdc62',
                });

                // ลดการเข้าถึงห้องต่างๆของผู้ใข้ที่ไม่ได้รับอนุญาต (@everyone)
                interaction.guild?.channels.cache.forEach((channel:any) => {
                  channel.permissionOverwrites.edit(everyoneRole, {
                    VIEW_CHANNEL: false,
                  });
                });

                // เพิ่ม permission ให้ "vertify" เห็นทุกห้อง
                interaction.guild?.channels.cache.forEach((channel:any) => {
                  channel.permissionOverwrites.edit(role, {
                    VIEW_CHANNEL: true,
                  });
                });

                // สร้าง channel สำหรับห้องยืนยันตัวตน
                let channel:any = await interaction.guild?.channels.create('Auth', {
                  type: 'GUILD_TEXT',
                });

                channel.permissionOverwrites.edit(role, {
                  VIEW_CHANNEL: false,
                });

                // embed_confirm
                interaction.editReply({
                  embeds: [
                    await new MessageEmbed()
                      .setTitle(eval(word.setup.auth.embed_confirm.title))
                      .addField(
                        'Auth',
                        eval(word.setup.auth.embed_confirm.field),
                      )
                      .setColor('#0099ff')
                      .setFooter(
                        `Requested by ${interaction.user.tag}`,
                        interaction.user.displayAvatarURL(),
                      ),
                  ],
                });

                // สร้าง selector สำหรับผู้ยืนยันตัวตน
                const row = new MessageActionRow().addComponents(
                  new MessageSelectMenu()
                    .setCustomId('member')
                    .setMaxValues(1)
                    .setPlaceholder('เลือกเมนู')
                    .addOptions([
                      {
                        label: '🔐| Verify',
                        description: 'กดที่นี่เพื่อยื่นยันตัวตน',
                        value: role.id,
                      },
                    ]),
                );

                const embed = new MessageEmbed()
                  .setTitle(eval(word.setup.auth.embed.title))
                  .setDescription(eval(word.setup.auth.embed.description))
                  .setColor('GREEN');

                let msg = await channel.send({
                  embeds: [embed],
                  components: [row],
                });

                let channelData;
                try {
                  channelData = await channelModel.findOne({
                    guild_ID: interaction.guild?.id,
                  });
                  if (!channelData) {
                    channelData = await channelModel.create({
                      guild_ID: interaction.guild?.id,
                    });
                  }
                } catch (err) {
                  console.log(err);
                }

                // Add to database
                channelData = await channelModel.findOneAndUpdate(
                  { guild_ID: interaction.guild?.id },
                  {
                    auth_role_ID: role.id,
                  },
                );
              }
              break;
            case 'about':
              {
                const embed = await new MessageEmbed()
                  .setColor('RED')
                  .setTitle(eval(word.setup.auth.about.title))
                  .setDescription(eval(word.setup.auth.about.description))
                  .setFooter(
                    `Requested by ${interaction.user.tag}`,
                    interaction.user.displayAvatarURL(),
                  );
                const attachment = new MessageAttachment(
                  './src/assets/images/about.auth.png',
                );
                interaction.reply({ files: [attachment], embeds: [embed] });
              }
              break;
          }
        }
        break;
    }
  },
};
