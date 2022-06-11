import { Schema, model } from 'mongoose';

interface IChannel {
  guild_ID: string,
  voice_ID: string,
  remove_ID: string,
  wordle_ID: string,
  auth_role_ID: string,
}

const channelSchema = new Schema<IChannel>({
  guild_ID: { type: String, required: true, unique: true },
  voice_ID: { type: String },
  remove_ID: { type: String },
  wordle_ID: { type: String },
  auth_role_ID: { type: String },
})

const models = model<IChannel>('ChannelModels', channelSchema);

module.exports = models;
