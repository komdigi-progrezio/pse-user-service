import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_penanggung_jawabAttributes {
  id?: number;
  sis_profil_id?: number;
  nama?: string;
  nip?: string;
  jabatan?: string;
  alamat?: string;
  kota?: number;
  propinsi?: number;
  kode_pos?: string;
  handphone?: string;
  email?: string;
  created_at?: Date;
  modified_at?: Date;
  satuan_kerja?: string;
  par_satuan_kerja_id?: number;
}

@Table({
  tableName: 'sis_penanggung_jawab',
  schema: 'public',
  timestamps: false,
})
export class sis_penanggung_jawab
  extends Model<sis_penanggung_jawabAttributes, sis_penanggung_jawabAttributes>
  implements sis_penanggung_jawabAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_penanggung_jawab_id_seq'::regclass)",
    ),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nip?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jabatan?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  alamat?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  kota?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  propinsi?: number;

  @Column({ allowNull: true, type: DataType.STRING(5) })
  kode_pos?: string;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  handphone?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  email?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(500) })
  satuan_kerja?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  par_satuan_kerja_id?: number;
}
