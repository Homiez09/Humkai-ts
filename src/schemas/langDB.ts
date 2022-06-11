import { Schema, model } from 'mongoose';

interface ILang {
  id: string,
  lang: string
}

const langSchema = new Schema<ILang>({
  id: { type: String, required: true, unique: true },
  lang: { type: String, required: true },
});

const models = model<ILang>('langModels', langSchema);

module.exports = models;
