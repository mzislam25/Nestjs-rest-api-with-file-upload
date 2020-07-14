import { Document } from 'mongoose';
export class CreateCarDto extends Document{
    readonly name: string;
    readonly year: number;
    readonly manufacturer: string;
    readonly image: string;
}