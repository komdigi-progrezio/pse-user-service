import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface role_has_permissionsAttributes {
  permission_id: string;
  role_id: string;
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
  @Column({ primaryKey: true, type: DataType.BIGINT })
  @Index({ name: 'role_has_permissions_pkey', using: 'btree', unique: true })
  permission_id!: string;

  @Column({ primaryKey: true, type: DataType.BIGINT })
  @Index({ name: 'role_has_permissions_pkey', using: 'btree', unique: true })
  role_id!: string;
}
