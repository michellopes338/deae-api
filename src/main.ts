import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ValidationPipe } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import helmet from '@fastify/helmet';
// import fastifyCsrf from 'fastify-csrf';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({
      logger: true,
    }),
  );
  const whitelist = [
    'http://localhost:3000',
    'http://127.0.0.1:3000',
    'http://10.0.0.102:3000',
    'https://deae-web-next-bkdqf55zh-michellopes338.vercel.app:443',
    'https://deae-web-next-bkdqf55zh-michellopes338.vercel.app:8443',
    'https://deae-web-next-bkdqf55zh-michellopes338.vercel.app',
    'https://3000-michellopes-deaewebnext-tu4ew97v79e.ws-us70.gitpod.io',
  ];
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  app.enableCors({
    origin: (origin, callback) => {
      if (!origin || whitelist.indexOf(origin) !== -1) {
        callback(null, true);
      }
    },
    exposedHeaders: 'Authorization',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  await app.register(helmet);
  // await app.register(fastifyCsrf);
  await app.listen(process.env.PORT || 8000, '0.0.0.0');
}
bootstrap();
