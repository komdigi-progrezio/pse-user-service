import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { SequelizeModule } from '@nestjs/sequelize';
import { account } from '../../models/account';

@Module({
  imports: [
    SequelizeModule.forFeature([account]),
    ClientsModule.register([
      {
        name: 'PSE_NOTIFICATION_SERVICE',
        transport: Transport.TCP,
        options: {
          host: process.env.PSE_NOTIFICATION_SERVICE_HOST || '127.0.0.1',
          port: parseInt(process.env.PSE_NOTIFICATION_SERVICE_PORT, 10) || 8004,
        },
      },
    ]),
  ],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
