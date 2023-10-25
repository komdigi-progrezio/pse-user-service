import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_standardisasiAttributes {
  id?: number;
  sis_profil_id?: number;
  nama_standar?: string;
  keterangan?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_standardisasi', schema: 'public', timestamps: false })
export class sis_standardisasi
  extends Model<sis_standardisasiAttributes, sis_standardisasiAttributes>
  implements sis_standardisasiAttributes
{
  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_standardisasi_id_seq'::regclass)",
    ),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  nama_standar?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
