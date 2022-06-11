import Canvas from "canvas";
import { Client, CommandInteraction } from 'discord.js'

const rankModel = require('../../schemas/rankDB');

module.exports = {
  name: 'rank',
  description: 'ดูระดับของคุณ',
  category: 'Rank',
  botPerms: ['ADMINISTRATOR'],
  run: async (interaction: CommandInteraction, client: Client) => {
    await interaction.deferReply();
    const applyText = (canvas: Canvas.Canvas, text: string) => {
      const context = canvas.getContext('2d');

      let fontSizeX: number = 60;

      do {
        context.font = `${(fontSizeX -= 10)}px sans-serif`;
      } while (context.measureText(text).width > canvas.width - 300);

      return context.font;
    };

    const user = interaction.user;
    const avatar = user.displayAvatarURL({ format: 'png', dynamic: true });
    const card = await Canvas.loadImage('./src/assets/images/rank.png');
    const avatarImg = await Canvas.loadImage(avatar);

    let canvas = Canvas.createCanvas(768, 232);
    let ctx: any= canvas.getContext('2d');

    ctx.drawImage(card, 0, 0, canvas.width, canvas.height);

    ctx.shadowColor = 'black';
    ctx.shadowOffsetX = 0;
    ctx.chadowOffsetY = 2;
    ctx.shadowBlur = 3;

    let rankData;
    rankData = await rankModel.findOne({
      userID: user.id,
    });

    if (!rankData) {
      rankData = await rankModel.create({
        userID: user.id,
      });
    }

    const lvl = rankData.rank;
    const expMax = 5 * lvl ** 2 + 50 * lvl + 100;
    const expNow = rankData.exp;

    let x = 727;
    let y = 0;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.font = '25px Arial';
    ctx.fillStyle = '#00bfff';
    ctx.textAlign = 'right';
    ctx.fillText(`LEVEL ${rankData.rank}`, x, 75);
    ctx.closePath();

    x = 212;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.font = '35px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(`${user.username}`, x, 116);
    ctx.closePath();

    let progressBar = (expNow / expMax) * 100;

    if (progressBar > 100) {
      progressBar = 100;
    }

    x = 211;
    y = 151;
    let width = progressBar * 5.2;
    let height = 30;
    let radius = 20;
    if (width < 2 * radius) radius = width / 2;
    if (height < 2 * radius) radius = height / 2;
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.arcTo(x + width, y, x + width, y + height, radius);
    ctx.arcTo(x + width, y + height, x, y + height, radius);
    ctx.arcTo(x, y + height, x, y, radius);
    ctx.arcTo(x, y, x + width, y, radius);
    ctx.closePath();
    ctx.fillStyle = '#5151d7';
    ctx.fill();

    x = 469;
    y = 160;
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.font = '25px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'right';
    ctx.fillText(`${expNow} `, x, 175);
    ctx.closePath();

    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.font = '25px Arial';
    ctx.fillStyle = '#FFFFFF';
    ctx.textAlign = 'left';
    ctx.fillText(`/ ${expMax}`, x, 175);
    ctx.closePath();

    ctx.beginPath();
    ctx.arc(101, 115, 68.5, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(avatarImg, 32, 45, 138, 138);
    ctx.closePath();

    const buffer = await canvas.toBuffer();
    try {
      await interaction.editReply({
        files: [{ attachment: buffer, name: 'rank.png' }],
      });
    } catch (error) {
      console.log(error);
    }
  },
};
