import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  HasOne,
} from 'sequelize-typescript';
import { account } from './account';

export interface account_rolesAttributes {
  role_id?: string;
  account_id?: string;
}

@Table({ tableName: 'account_roles', schema: 'public', timestamps: false })
export class account_roles
  extends Model<account_rolesAttributes, account_rolesAttributes>
  implements account_rolesAttributes
{
  @Column({ allowNull: true, type: DataType.BIGINT })
  role_id?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  account_id?: string;

  @HasOne(() => account, { sourceKey: 'account_id' })
  account?: account;
}
