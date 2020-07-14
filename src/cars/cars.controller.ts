import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import {CreateCarDto} from './dto/create-car-dto';
import {CarsService} from './cars.service';
import {Car} from './interfaces/car.interface';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';

@Controller('cars')
export class CarsController {
  SERVER_URL:  string  =  "http://localhost:3000/cars/";
  constructor (private readonly carsService: CarsService){}

	@Get()
  findcAll(): Promise<Car[]>{
    return this.carsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Car> {
    return this.carsService.findOne(id); 
  }

  @Post()
  create(@Body() createCarDto: CreateCarDto): Promise<Car> {
    return this.carsService.create(createCarDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Car>{
    return this.carsService.delete(id);
  }

  @Put(':id')
  update(@Body() updateCarDto: CreateCarDto, @Param('id') id): Promise<Car>{
    return this.carsService.update(id,updateCarDto);
  }

  @Post(':id/image')
  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: './uploads', 
        filename: (req, file, cb) => {
        const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
        return cb(null, `${randomName}${extname(file.originalname)}`)
      }
      })
    }
  )
  )
  uploadImage(@Param('id') id, @UploadedFile() file): Promise<Car> {
    return this.carsService.setImage(id, `${this.SERVER_URL}${file.path}`);
  }

  @Get('uploads/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads'});
  }

}
