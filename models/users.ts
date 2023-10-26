import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface usersAttributes {
  id?: string;
  name?: string;
  email?: string;
  email_verified_at?: Date;
  password?: string;
  remember_token?: string;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'users', schema: 'public', timestamps: false })
export class users
  extends Model<usersAttributes, usersAttributes>
  implements usersAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    defaultValue: Sequelize.literal("nextval('users_id_seq'::regclass)"),
  })
  @Index({ name: 'users_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'users_email_unique', using: 'btree', unique: true })
  email?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  email_verified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  password?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  remember_token?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
}
