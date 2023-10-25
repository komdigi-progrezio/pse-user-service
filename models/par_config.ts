import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_configAttributes {
  id?: number;
  param_name?: string;
  param_value?: string;
  created_at?: Date;
  modified_at?: Date;
  category?: string;
  instansi_id?: number;
  approved?: number;
}

@Table({ tableName: 'par_config', schema: 'public', timestamps: false })
export class par_config
  extends Model<par_configAttributes, par_configAttributes>
  implements par_configAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_config_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  param_name?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  param_value?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  category?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  instansi_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  approved?: number;
}
