import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface failed_jobsAttributes {
  id?: string;
  connection?: string;
  queue?: string;
  payload?: string;
  exception?: string;
  failed_at?: Date;
}

@Table({ tableName: 'failed_jobs', schema: 'public', timestamps: false })
export class failed_jobs
  extends Model<failed_jobsAttributes, failed_jobsAttributes>
  implements failed_jobsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    defaultValue: Sequelize.literal("nextval('failed_jobs_id_seq'::regclass)"),
  })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  connection?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  queue?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  payload?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  exception?: string;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  failed_at?: Date;
}
