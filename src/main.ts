import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
// import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // // Adiciona o ValidationPipe global para validar automaticamente os DTOs
  // app.useGlobalPipes(new ValidationPipe({
  //   whitelist: true, // Remove campos não declarados no DTO
  //   forbidNonWhitelisted: true, // Rejeita campos extras
  //   transform: true, // Transforma os dados de acordo com os tipos dos DTOs
  // }));

  await app.listen(3000);
}
bootstrap();
