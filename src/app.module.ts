import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CarsController } from './cars/cars.controller';
import { ManufacturersController } from './manufacturers/manufacturers.controller';
import { CarsService } from './cars/cars.service';
import {CarsModule} from './cars/cars.module';
import { MongooseModule } from '@nestjs/mongoose';
import {CarSchema} from './cars/schemas/car.schema';
import { ManufacturerSchema } from './manufacturers/schemas/manufacturer.schema';
import config from './config/keys';
import { MulterModule } from '@nestjs/platform-express';
import { ManufacturersModule } from './manufacturers/manufacturers.module';
import { ManufacturersService } from './manufacturers/manufacturers.service';


@Module({
  imports: [CarsModule, 
    ManufacturersModule,
    MongooseModule.forRoot(config.mongoURI), 
    MongooseModule.forFeature([{name:'Car', schema: CarSchema}]),
    MongooseModule.forFeature([{name:'Manufacturer', schema: ManufacturerSchema}]),
    MulterModule.registerAsync({
      useFactory: () => ({
      dest: '/upload',
    })
  })
  ],
  controllers: [AppController, CarsController, ManufacturersController],
  providers: [AppService, CarsService, ManufacturersService],
})
export class AppModule {}
