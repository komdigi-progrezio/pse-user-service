import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_reportAttributes {
  id?: number;
  name?: string;
  content?: string;
  account_id?: number;
  propinsi?: number;
}

@Table({ tableName: 'sis_report', schema: 'public', timestamps: false })
export class sis_report
  extends Model<sis_reportAttributes, sis_reportAttributes>
  implements sis_reportAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_report_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  content?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  propinsi?: number;
}
