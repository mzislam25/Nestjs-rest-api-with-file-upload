# Nestjs-rest-api-with-file-upload
Restful API with file upload using Nestjs and mongodb

## Quick Start

``` bash
# Install 
npm install

## Running the app

# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod

```

## Endpoints

### List all cars
``` bash
GET cars
```
### Get single car
``` bash
GET cars/{id}
```

### Delete car
``` bash
DELETE cars/{id}
```

### Add Cars
``` bash
POST cars
{
    "name": "Sesto Elemento",
    "year": 2015,
    "manufacturer": "Lambourghini",
    "image": "noImage.jpg"
}
```


```

## App Info

### Author

Zahir [Krittimmanush](https://www.krittimmanush.com)

### Version

1.0.0

### License

This project is licensed under the MIT License
