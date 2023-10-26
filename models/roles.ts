import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import { account_roles } from './account_roles';
import { role_has_permissions } from './role_has_permissions';

export interface rolesAttributes {
  id?: string;
  name?: string;
  guard_name?: string;
  created_at?: Date;
  updated_at?: Date;
  created_by?: number;
  updated_by?: number;
}

@Table({ tableName: 'roles', schema: 'public', timestamps: false })
export class roles
  extends Model<rolesAttributes, rolesAttributes>
  implements rolesAttributes
{
  @ForeignKey(() => account_roles)
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    defaultValue: Sequelize.literal("nextval('roles_id_seq'::regclass)"),
  })
  @Index({ name: 'roles_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  guard_name?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  created_by?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  updated_by?: number;

  @BelongsTo(() => account_roles)
  account_role?: account_roles;

  @HasMany(() => role_has_permissions, { sourceKey: 'id' })
  role_has_permissions?: role_has_permissions[];
}
