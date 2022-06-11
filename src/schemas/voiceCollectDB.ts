import { Schema, model } from 'mongoose';

interface IVoiceCollect {
  user_ID: string,
  channel_ID: string,
}

const voiceCollectSchema = new Schema<IVoiceCollect>({
  user_ID: { type: String, required: true },
  channel_ID: { type: String, required: true },
});

const models = model<IVoiceCollect>('voiceCollectModels', voiceCollectSchema);

module.exports = models;
