import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface account_parentAttributes {
  account_id?: number;
  parent_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'account_parent', schema: 'public', timestamps: false })
export class account_parent
  extends Model<account_parentAttributes, account_parentAttributes>
  implements account_parentAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  parent_id?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
}
