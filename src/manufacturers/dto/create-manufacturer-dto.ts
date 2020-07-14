import { Document } from 'mongoose';
export class CreateManufacturerDto extends Document{
    readonly name: string;
    readonly country: string;
    readonly logo: string;
}