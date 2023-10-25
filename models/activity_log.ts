import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface activity_logAttributes {
  id?: number;
  account_id?: number;
  module_name?: string;
  module_id?: number;
  created_at?: Date;
  ip_address?: string;
  module_action?: string;
  module_column?: string;
  module_value?: string;
}

@Table({ tableName: 'activity_log', schema: 'public', timestamps: false })
export class activity_log
  extends Model<activity_logAttributes, activity_logAttributes>
  implements activity_logAttributes
{
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('activity_log_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  module_name?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  module_id?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  ip_address?: string;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  module_action?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  module_column?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  module_value?: string;
}
