import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_propinsi_migrasiAttributes {
  id?: string;
  name?: string;
}

@Table({
  tableName: 'par_propinsi_migrasi',
  schema: 'public',
  timestamps: false,
})
export class par_propinsi_migrasi
  extends Model<par_propinsi_migrasiAttributes, par_propinsi_migrasiAttributes>
  implements par_propinsi_migrasiAttributes
{
  @Column({ allowNull: true, type: DataType.STRING(2) })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(225) })
  name?: string;
}
