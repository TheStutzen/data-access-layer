import { MicroserviceOptions, Transport } from '@nestjs/microservices'

export const microServiceConfig: MicroserviceOptions = {
  transport: Transport.TCP,
  options: {
    host: 'data-access-layer',
    port: 3090,
  },
}
