import { Client, VoiceState } from 'discord.js';

const channelModel = require('../../schemas/channelDB');
const voiceCollectModel = require('../../schemas/voiceCollectDB');

require('dotenv').config();

export interface voiceCollect {
  user_ID: string;
  channel_ID: string;
}

module.exports = async (client: Client, oldState: VoiceState, newState: VoiceState) => {
  const user = await client.users.fetch(newState.id);
  const member = await newState.guild.members.fetch(user.id);
  const channelData = await channelModel.findOne({
    guild_ID: newState.guild.id,
  });

  try {
    if (!oldState.channel && newState.channel?.id === channelData.voice_ID) {
      const channel = await newState.guild.channels.create(user.tag, {
        type: 'GUILD_VOICE',
        parent: newState.channel?.parent!,
      });
      channel.permissionOverwrites.create(user.id, {
        MANAGE_CHANNELS: true,
        MUTE_MEMBERS: true,
        DEAFEN_MEMBERS: true,
        MANAGE_ROLES: true,
        MOVE_MEMBERS: true,
      });
      member.voice.setChannel(channel);
      //voiceCollection.set(user.id, channel.id);
      await voiceCollectModel.create({
        user_ID: user.id,
        channel_ID: channel.id,
      });
    } else if (!newState.channel) {
      try {
        let voiceCollect;
        voiceCollect = await voiceCollectModel.findOne({
          channel_ID: oldState.channel?.id,
        });
        if (!voiceCollect) return;
        if (voiceCollect)
          if (oldState.channel?.id === voiceCollect.channel_ID) {
            if (oldState.channel?.members.size! < 1) {
              oldState.channel?.delete();
              return await voiceCollectModel.deleteOne({
                channel_ID: oldState.channel?.id,
              });
            }
          }
      } catch (error) {
        console.log(error);
      }
    }
  } catch (error) {
    console.log(error);
  }
};
