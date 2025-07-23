import { Schema, model } from 'mongoose';

const ProcessedDataSchema = new Schema({
    fileId: { type: Schema.Types.ObjectId, ref: 'File', required: true },
    data: { type: Schema.Types.Mixed, required: true },
    createdAt: { type: Date, default: Date.now }
});

export const ProcessedDataModel = model('ProcessedData', ProcessedDataSchema);