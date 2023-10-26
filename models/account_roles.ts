import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasOne,
} from 'sequelize-typescript';
import { account } from './account';
import { roles } from './roles';

export interface account_rolesAttributes {
  role_id?: string;
  account_id?: string;
  id?: number;
}

@Table({ tableName: 'account_roles', schema: 'public', timestamps: false })
export class account_roles
  extends Model<account_rolesAttributes, account_rolesAttributes>
  implements account_rolesAttributes
{
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: 'fki_fk_account_roles_roles', using: 'btree', unique: false })
  role_id?: string;

  @ForeignKey(() => account)
  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: 'fki_fk_account_roles', using: 'btree', unique: false })
  account_id?: string;

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('account_roles_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'account_roles_pkey', using: 'btree', unique: true })
  id?: number;

  @BelongsTo(() => account)
  account?: account;

  @HasOne(() => roles, { sourceKey: 'role_id' })
  role?: roles;
}
