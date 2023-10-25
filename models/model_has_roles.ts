import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

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
  role_id!: string;

  @Column({ primaryKey: true, type: DataType.STRING(255) })
  model_type!: string;

  @Column({ primaryKey: true, type: DataType.BIGINT })
  model_id!: string;
}
