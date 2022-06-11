import { Schema, model } from 'mongoose';

interface IWordle {
    user_ID: string,
    day: number,
    working: boolean,
    word: string,
    doing: any,
}

const wordleSchema = new Schema<IWordle>({
    user_ID: { type: String, required: true, unique: true },
    day: { type: Number, default: 0 },
    working: { type: Boolean, default: false },
    word: { type: String, default: '' },
    doing: { type: Array, default: [] },
});

const models = model<IWordle>('WordleModels', wordleSchema);

module.exports = models;
