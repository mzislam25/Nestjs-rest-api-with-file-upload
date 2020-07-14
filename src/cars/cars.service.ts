import { Injectable } from '@nestjs/common';
import {Car} from './interfaces/car.interface';
import {Model} from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';


@Injectable()
export class CarsService {
    constructor(@InjectModel('Car') private readonly carModel:Model<Car>){}
    
    async findAll(): Promise<Car[]> {
        return await this.carModel.find();
    }

    async findOne(id: string):Promise<Car>{
        return await this.carModel.findOne({_id: id});
    }

    async create(car:Car): Promise<Car>{
        const newCar = new this.carModel(car);
        return await newCar.save();
    }

    async update(id:string, car:Car):Promise<Car>{
        return await this.carModel.findByIdAndUpdate(id, car, {new: true});
    }

    async delete(id:string): Promise<Car>{
        return await this.carModel.findByIdAndRemove(id);
    }

    async setImage(id: string, imgUrl: string):Promise<Car>{
        return await this.carModel.findByIdAndUpdate(id, {image: imgUrl}, {new: false});
    }

}
