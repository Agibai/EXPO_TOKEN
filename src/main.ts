import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';


async function bootstrap() {
const app = await NestFactory.create(AppModule);
const configService = app.get(ConfigService);


const config = new DocumentBuilder()
.setTitle('YRGYZ taxi API')
.setDescription('API for YRGYZ taxi')
.setVersion('1.0')
.addBearerAuth()
.build();


const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup('api/docs', app, document);


const port = configService.get('PORT') || 3000;
await app.listen(port);
console.log(`Listening on ${port}`);
}
bootstrap();
