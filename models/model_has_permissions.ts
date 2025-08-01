import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface model_has_permissionsAttributes {
  permission_id: string;
  model_type: string;
  model_id: string;
}

@Table({
  tableName: 'model_has_permissions',
  schema: 'public',
  timestamps: false,
})
export class model_has_permissions
  extends Model<
    model_has_permissionsAttributes,
    model_has_permissionsAttributes
  >
  implements model_has_permissionsAttributes
{
  @Column({ primaryKey: true, type: DataType.BIGINT })
  @Index({ name: 'model_has_permissions_pkey', using: 'btree', unique: true })
  permission_id!: string;

  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'model_has_permissions_pkey', using: 'btree', unique: true })
  @Index({
    name: 'model_has_permissions_model_id_model_type_index',
    using: 'btree',
    unique: false,
  })
  model_type!: string;

  @Column({ primaryKey: true, type: DataType.BIGINT })
  @Index({ name: 'model_has_permissions_pkey', using: 'btree', unique: true })
  @Index({
    name: 'model_has_permissions_model_id_model_type_index',
    using: 'btree',
    unique: false,
  })
  model_id!: string;
}
