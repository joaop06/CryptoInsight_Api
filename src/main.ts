import { AppModule } from './app.module';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { FindOptionsMiddleware } from 'middlewares/find-options.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Adiciona o ValidationPipe global para validar automaticamente os DTOs
  app.useGlobalPipes(new ValidationPipe({
    transform: true, // Transforma os dados de acordo com os tipos dos DTOs
    whitelist: true, // Remove campos não declarados no DTO
    forbidNonWhitelisted: true, // Rejeita campos extras
  }));

  // Aplica o middleware globalmente em todas as rotas
  app.use(new FindOptionsMiddleware());

  await app.listen(3000);
}
bootstrap();
