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
import { account } from './account';

export interface model_has_rolesAttributes {
  role_id: string;
  model_type: string;
  model_id: string;
}

@Table({ tableName: 'model_has_roles', schema: 'public', timestamps: false })
export class model_has_roles
  extends Model<model_has_rolesAttributes, model_has_rolesAttributes>
  implements model_has_rolesAttributes
{
  @Column({ primaryKey: true, type: DataType.BIGINT })
  @Index({ name: 'model_has_roles_pkey', using: 'btree', unique: true })
  role_id!: string;

  @Column({ primaryKey: true, type: DataType.STRING(255) })
  @Index({ name: 'model_has_roles_pkey', using: 'btree', unique: true })
  @Index({
    name: 'model_has_roles_model_id_model_type_index',
    using: 'btree',
    unique: false,
  })
  model_type!: string;

  @ForeignKey(() => account)
  @Column({ primaryKey: true, type: DataType.BIGINT })
  @Index({ name: 'model_has_roles_pkey', using: 'btree', unique: true })
  @Index({
    name: 'model_has_roles_model_id_model_type_index',
    using: 'btree',
    unique: false,
  })
  model_id!: string;

  @BelongsTo(() => account)
  account?: account;
}
