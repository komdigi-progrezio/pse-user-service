import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface account_takel_existAttributes {
  id?: number;
  email?: string;
  status?: string;
  verified?: string;
  bpm_user_id?: string;
}

@Table({
  tableName: 'account_takel_exist',
  schema: 'public',
  timestamps: false,
})
export class account_takel_exist
  extends Model<account_takel_existAttributes, account_takel_existAttributes>
  implements account_takel_existAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  email?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  status?: string;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  verified?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  bpm_user_id?: string;
}
