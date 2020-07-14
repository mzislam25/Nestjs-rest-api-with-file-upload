import { Controller, Get, Post, Put, Delete, Param, Body, UseInterceptors, UploadedFile, Res} from '@nestjs/common';
import {CreateManufacturerDto} from './dto/create-manufacturer-dto';
import {ManufacturersService} from './manufacturers.service';
import {Manufacturer} from './interfaces/manufacturer.interface';
import {FileInterceptor} from '@nestjs/platform-express';
import { diskStorage } from  'multer';
import { extname } from  'path';


@Controller('manufacturers')
export class ManufacturersController {
  SERVER_URL:  string  =  "http://localhost:3000/manufacturers/";
  constructor (private readonly manufacturersService: ManufacturersService){}

	@Get()
  findcAll(): Promise<Manufacturer[]>{
    return this.manufacturersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Manufacturer> {
    return this.manufacturersService.findOne(id); 
  }

  @Post()
  create(@Body() createManufacturerDto: CreateManufacturerDto): Promise<Manufacturer> {
    return this.manufacturersService.create(createManufacturerDto);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<Manufacturer>{
    return this.manufacturersService.delete(id);
  }

  @Put(':id')
  update(@Body() updateManufacturerDto: CreateManufacturerDto, @Param('id') id): Promise<Manufacturer>{
    return this.manufacturersService.update(id,updateManufacturerDto);
  }

  @Post(':id/logo')
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
  uploadImage(@Param('id') id, @UploadedFile() file): Promise<Manufacturer> {
    return this.manufacturersService.setImage(id, `${this.SERVER_URL}${file.path}`);
  }

  @Get('uploads/:fileId')
  async serveImage(@Param('fileId') fileId, @Res() res): Promise<any> {
    res.sendFile(fileId, { root: 'uploads'});
  }
}
