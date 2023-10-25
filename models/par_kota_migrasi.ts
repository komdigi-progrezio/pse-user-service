import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_kota_migrasiAttributes {
  id?: string;
  province_id?: string;
  name?: string;
}

@Table({ tableName: 'par_kota_migrasi', schema: 'public', timestamps: false })
export class par_kota_migrasi
  extends Model<par_kota_migrasiAttributes, par_kota_migrasiAttributes>
  implements par_kota_migrasiAttributes
{
  @Column({ allowNull: true, type: DataType.STRING(4) })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(2) })
  province_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;
}
