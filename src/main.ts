import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  // CORS
  app.enableCors();

  // Swagger documentation
  const config = new DocumentBuilder()
    .setTitle('Wine Reviews API')
    .setDescription('API for managing wine reviews and ratings')
    .setVersion('1.0')
    .addTag('wines')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000 , '0.0.0.0' );
  console.log('🍷 Wine Reviews API running on http://localhost:3000');
  console.log('📖 API Documentation available at http://localhost:3000/api');
}
bootstrap();