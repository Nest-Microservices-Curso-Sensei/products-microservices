import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './configs';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('Main');
  
  console.log(envs.natsServers);
  

   const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      // transport: Transport.TCP,
      transport: Transport.NATS,
      options: {
        servers: envs.natsServers 
      }
    },
  );


  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    })
  );

  // await app.listen( envs.port );
  await app.listen();

  // Iniciar todos los micro-servicios : Modo hibrido
  // await app.startAllMicroservices();

  // logger.log(`App running on port ${ envs.port }`);
  logger.log(`Products Microservice running on port ${ envs.port }`);
  
}
bootstrap();
