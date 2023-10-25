import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_propinsiAttributes {
  id?: number;
  nama?: string;
}

@Table({ tableName: 'par_propinsi', schema: 'public', timestamps: false })
export class par_propinsi
  extends Model<par_propinsiAttributes, par_propinsiAttributes>
  implements par_propinsiAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_propinsi_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama?: string;
}
