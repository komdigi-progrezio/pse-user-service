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
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  type?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  notifiable_type?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
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
