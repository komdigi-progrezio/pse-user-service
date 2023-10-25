import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface account_pwd_migrationAttributes {
  id?: number;
  email?: string;
  password?: string;
  status?: number;
}

@Table({
  tableName: 'account_pwd_migration',
  schema: 'public',
  timestamps: false,
})
export class account_pwd_migration
  extends Model<
    account_pwd_migrationAttributes,
    account_pwd_migrationAttributes
  >
  implements account_pwd_migrationAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  email?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  password?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  status?: number;
}
