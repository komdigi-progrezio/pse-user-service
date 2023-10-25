import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface emailAttributes {
  id?: number;
  smtp?: string;
  username?: string;
  password?: string;
  port?: number;
  encryption?: string;
  sender_name?: string;
}

@Table({ tableName: 'email', schema: 'public', timestamps: false })
export class email
  extends Model<emailAttributes, emailAttributes>
  implements emailAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('email_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  smtp?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  password?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  port?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  encryption?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  sender_name?: string;
}
