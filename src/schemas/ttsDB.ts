import { Schema, model } from 'mongoose';

interface ITts {
  guildID: string,
  channelID: string,
  ttsStatus: boolean,
  //content: array,
}

const ttsSchema = new Schema<ITts>({
  guildID: { type: String, required: true, unique: true },
  channelID: { type: String },
  ttsStatus: { type: Boolean, default: false },
  //ontent: { type: Array, default: [] },
});

const models = model<ITts>('ttsModels', ttsSchema);

module.exports = models;
