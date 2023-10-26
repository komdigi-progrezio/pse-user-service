import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  account,
  account_roles,
  permissions,
  role_has_permissions,
  roles,
  users,
} from 'models';
import { RolesModule } from './roles/roles.module';

@Module({
  imports: [
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      models: [],
      autoLoadModels: true,
      synchronize: true,
    }),
    SequelizeModule.forFeature([
      users,
      account,
      account_roles,
      roles,
      role_has_permissions,
      permissions,
    ]),
    UsersModule,
    RolesModule,
  ],
})
export class AppModule {}
