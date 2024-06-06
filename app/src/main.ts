import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { microServiceConfig } from 'app/config/microservice.config'
import { MicroserviceOptions } from '@nestjs/microservices'

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    microServiceConfig,
  )
  await app.listen()
  console.log('Microservice is start on port 3090')
}
bootstrap()
