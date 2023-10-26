import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
}
