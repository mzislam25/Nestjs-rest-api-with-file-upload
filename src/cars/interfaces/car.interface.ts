import { Document } from 'mongoose';
export interface Car extends Document{
    readonly id?: string;
    readonly name: string;
    readonly manufacturer: string;
    readonly year: number;
    readonly image: string;
}