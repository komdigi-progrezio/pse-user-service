import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface notificationsAttributes {
  id: string;
  type?: string;
  notifiable_type?: string;
  notifiable_id?: string;
  data?: string;
  read_at?: Date;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'notifications', schema: 'public', timestamps: false })
export class notifications
  extends Model<notificationsAttributes, notificationsAttributes>
  implements notificationsAttributes
{
  @Column({ primaryKey: true, type: DataType.UUID })
  @Index({ name: 'notifications_pkey', using: 'btree', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  type?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({
    name: 'notifications_notifiable_type_notifiable_id_index',
    using: 'btree',
    unique: false,
  })
  notifiable_type?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({
    name: 'notifications_notifiable_type_notifiable_id_index',
    using: 'btree',
    unique: false,
  })
  notifiable_id?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  data?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  read_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
}
