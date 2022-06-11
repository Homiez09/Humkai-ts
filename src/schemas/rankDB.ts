import { Schema, model } from 'mongoose';

interface IRank {
  userID: string
  rank: number
  exp: number
  totalExp: number
}

const rankSchema = new Schema<IRank>({
  userID: { type: String, required: true, unique: true },
  rank: { type: Number, default: 0 },
  exp: { type: Number, default: 0 },
  totalExp: { type: Number, default: 0 },
});

const models = model<IRank>('rankModels', rankSchema);

module.exports = models;
