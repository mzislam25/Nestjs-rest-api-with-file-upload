import * as mongoose from 'mongoose';

export const CarSchema = new mongoose.Schema({
    name: String,
    year: Number,
    manufacturer: String,
    image: String
});