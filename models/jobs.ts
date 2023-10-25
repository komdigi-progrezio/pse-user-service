import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface jobsAttributes {
  id?: string;
  queue?: string;
  payload?: string;
  attempts?: number;
  reserved_at?: number;
  available_at?: number;
  created_at?: number;
}

@Table({ tableName: 'jobs', schema: 'public', timestamps: false })
export class jobs
  extends Model<jobsAttributes, jobsAttributes>
  implements jobsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    defaultValue: Sequelize.literal("nextval('jobs_id_seq'::regclass)"),
  })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  queue?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  payload?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  attempts?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  reserved_at?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  available_at?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  created_at?: number;
}
