import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  account,
  account_roles,
  account_satuan_kerja,
  par_instansi,
  par_kota,
  par_propinsi,
  par_satuan_kerja,
  permissions,
  role_has_permissions,
  roles,
  sis_profil,
  user_fcm_tokens,
  users,
} from 'models';
import { RolesModule } from './roles/roles.module';
import { PermissionsModule } from './permissions/permissions.module';

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
      timezone: '+07:00',
    }),
    SequelizeModule.forFeature([
      users,
      account,
      account_roles,
      roles,
      role_has_permissions,
      permissions,
      account_satuan_kerja,
      par_satuan_kerja,
      user_fcm_tokens,
      par_instansi,
      par_kota,
      par_propinsi,
      sis_profil,
    ]),
    UsersModule,
    RolesModule,
    PermissionsModule,
  ],
})
export class AppModule {}
