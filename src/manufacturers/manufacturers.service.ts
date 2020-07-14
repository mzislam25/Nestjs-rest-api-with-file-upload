import { Injectable } from '@nestjs/common';
import {Manufacturer} from './interfaces/manufacturer.interface';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class ManufacturersService {
    constructor(@InjectModel('Manufacturer') private readonly manufacturerModel:Model<Manufacturer>){}
    
    async findAll(): Promise<Manufacturer[]> {
        return await this.manufacturerModel.find();
    }

    async findOne(id: string):Promise<Manufacturer>{
        return await this.manufacturerModel.findOne({_id: id});
    }

    async create(manufacturer:Manufacturer): Promise<Manufacturer>{
        const newManufacturer = new this.manufacturerModel(manufacturer);
        return await newManufacturer.save();
    }

    async update(id:string, manufacturer:Manufacturer):Promise<Manufacturer>{
        return await this.manufacturerModel.findByIdAndUpdate(id, manufacturer, {new: true});
    }

    async delete(id:string): Promise<Manufacturer>{
        return await this.manufacturerModel.findByIdAndRemove(id);
    }

    async setImage(id: string, imgUrl: string):Promise<Manufacturer>{
        return await this.manufacturerModel.findByIdAndUpdate(id, {logo: imgUrl}, {new: false});
    }

}
