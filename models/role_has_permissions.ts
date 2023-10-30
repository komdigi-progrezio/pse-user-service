import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import { roles } from './roles';
import { permissions } from './permissions';

export interface role_has_permissionsAttributes {
  permission_id?: string;
  role_id?: string;
  id?: number;
}

@Table({
  tableName: 'role_has_permissions',
  schema: 'public',
  timestamps: false,
})
export class role_has_permissions
  extends Model<role_has_permissionsAttributes, role_has_permissionsAttributes>
  implements role_has_permissionsAttributes
{
  @ForeignKey(() => permissions)
  @Column({ allowNull: true, type: DataType.BIGINT })
  permission_id?: string;

  @ForeignKey(() => roles)
  @Column({ allowNull: true, type: DataType.BIGINT })
  role_id?: string;

  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('role_has_permissions_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'role_has_permissions_pkey', using: 'btree', unique: true })
  id?: number;

  @BelongsTo(() => roles)
  role?: roles;

  @BelongsTo(() => permissions)
  permission?: permissions;
}
