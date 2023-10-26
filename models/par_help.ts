import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_helpAttributes {
  id?: number;
  name?: string;
  help?: string;
}

@Table({ tableName: 'par_help', schema: 'public', timestamps: false })
export class par_help
  extends Model<par_helpAttributes, par_helpAttributes>
  implements par_helpAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_help_id_seq'::regclass)"),
  })
  @Index({ name: 'par_help_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  help?: string;
}
