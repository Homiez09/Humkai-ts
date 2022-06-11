import { Client, CommandInteraction, MessageEmbed } from 'discord.js';
import os from 'os';

const ms = require('ms');
const ipInfo = require('ipinfo');

module.exports = {
  name: 'bot-stats',
  description: 'เช็คสถานะของบอท',
  category: 'Information',
  botPerms: ['ADMINISTRATOR'],
  run: async (interaction: CommandInteraction, client: Client) => {
    let info = await ipInfo();
    await interaction.reply({
      embeds: [
        await new MessageEmbed()
          .setTitle('Bots server info')
          .setThumbnail(client.user!.displayAvatarURL())
          .addField('Platform', `${os.platform()} ${os.release()}`)
          .addField('Architecture', os.arch())
          .addField('System Uptime', ms(ms(`${os.uptime()}s`)))
          .addField(
            'Host location',
            `${info.city}, ${info.region} :flag_${info.country.toLowerCase()}:`,
          )
          .addField('Host IP', info.ip)
          .addField('Host name', info.hostname || 'None')
          .addField('Host organization', info.org)
          .addField(
            'CPUs',
            `${[...new Set(os.cpus().map((x) => x.model))].join('\n')}`,
          )
          .addField('CPU Cores', `${os.cpus().length}`)
          .addField('RAM Free', `${(os.freemem() / 1024 / 1024).toFixed(2)} MB`)
          .addField(
            'RAM Total',
            `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`,
          )
          .addField(
            'RAM Usage',
            `${((1 - os.freemem() / os.totalmem()) * 100).toFixed(2)}%`,
          )
          .addField('Discord.js Version', `${require('discord.js').version}`)
          .addField('Node.js Version', `${process.version}`)
          .setColor('#0099ff')
          .setFooter(
            `Requested by ${interaction.user.tag}`,
            interaction.user.displayAvatarURL(),
          ),
      ],
    });
  },
};
