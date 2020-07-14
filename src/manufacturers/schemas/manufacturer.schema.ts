import * as mongoose from 'mongoose';

export const ManufacturerSchema = new mongoose.Schema({
    name: String,
    country: String,
    logo: String
});