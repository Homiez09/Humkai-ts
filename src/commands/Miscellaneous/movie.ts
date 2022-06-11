import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import axios from 'axios';

const cheerio = require('cheerio');

module.exports = {
  name: 'movie',
  description: 'โปรแกรมฉายหนัง',
  category: 'miscellaneous',
  botPerms: [],
  options: [
    {
      name: 'options',
      description: 'ตัวเลือก',
      type: 3,
      required: true,
      choices: [
        {
          name: 'major',
          value: 'major',
        },
        {
          name: 'sf',
          value: 'sf',
        },
      ],
    },
  ],
  run: async (interaction: CommandInteraction, client: Client, word: any) => {
    const { options } = interaction;
    const choice = options.getString('options');
    switch (choice) {
      case 'major':
        {
          try {
            await interaction.deferReply();
            const siteUrl = 'https://majorcineplex.com/movie#movie-page-coming';

            const { data } = await axios({
              method: 'GET',
              url: siteUrl,
            });

            const $ = cheerio.load(data);
            const elemSelector: any = '#movie-page-showing > div > div';

            const keys = ['genre', 'date', 'name', 'time'];

            var listA: any = [];
            $(elemSelector).each((parentIdx:any, parentElem:any) => {
              let keyIdx = 0;
              const jsonList: any = {};

              if (true) {
                $(parentElem)
                  .children()
                  .each((childIdx:number, childElem:string) => {
                    const tdValue = $(childElem).text();
                    const tdValueOptimized = tdValue
                      .replace(/\s\s+ /g, ' ')
                      .trim();
                    const tdValueArray = tdValueOptimized.split(/\n/);
                    jsonList[keys[keyIdx]] = tdValueArray;
                    //jsonList[keys[keyIdx]] = tdValueArray;
                    keyIdx++;
                  });
                listA.push(jsonList);
              }
            });
            //return console.log(listA);
            const lengthOfListA: number = listA.length;
            const embed = new MessageEmbed()
              .setTitle(eval(word.movie.embed1.title))
              .setDescription(eval(word.movie.embed1.description))
              .setColor('#0099ff')
              .setTimestamp()
              .setFooter(
                `Requested by ${interaction.user.tag}`,
                interaction.user.displayAvatarURL(),
              );

            for (let i = 0; i < lengthOfListA; i++) {
              embed.addField(`${listA[i].name[0]}`, `${listA[i].date[0]}`);
            }

            await interaction.editReply({ embeds: [embed] });
          } catch (error) {
            console.log(error);
          }
        }
        break;
      case 'sf':
        {
          const embed = new MessageEmbed()
            .setTitle(eval(word.movie.embed2.title))
            .setDescription(eval(word.movie.embed2.description))
            .setColor('#0099ff')
            .setTimestamp()
            .setFooter(
              `Requested by ${interaction.user.tag}`,
              interaction.user.displayAvatarURL(),
            );

          /* for (let i = 0; i < lengthOfListA; i++) {
                        embed.addField(
                            `${listA[i].name[0]}`,
                            `${listA[i].time[0]}`,
                        )
                    } */

          await interaction.reply({ embeds: [embed], ephemeral: false });
        }
        break;
    }
  },
};
