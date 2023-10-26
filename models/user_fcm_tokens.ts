import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface user_fcm_tokensAttributes {
  id?: number;
  token?: string;
  apns_id?: string;
  created_at?: Date;
  updated_at?: Date;
  user_id?: number;
}

@Table({ tableName: 'user_fcm_tokens', schema: 'public', timestamps: false })
export class user_fcm_tokens
  extends Model<user_fcm_tokensAttributes, user_fcm_tokensAttributes>
  implements user_fcm_tokensAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('user_fcm_tokens_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'user_fcm_tokens_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(512) })
  token?: string;

  @Column({ allowNull: true, type: DataType.STRING(512) })
  apns_id?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  user_id?: number;
}
