import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface login_activityAttributes {
  id?: number;
  account_id?: number;
  username?: string;
  password?: string;
  otp?: number;
  created_at?: Date;
}

@Table({ 
  tableName: 'login_activity', 
  schema: 'public', 
  timestamps: true, 
  createdAt: 'created_at',
  updatedAt: false,
})
export class login_activity
  extends Model<login_activityAttributes, login_activityAttributes>
  implements login_activityAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('login_activity_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(70) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING(70) })
  password?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  otp?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

}