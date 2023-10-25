import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_hardwareAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: string;
  pemilik?: string;
  data_center?: string;
  diskspace?: string;
  bandwidth?: string;
  jumlah?: string;
  tipe?: string;
  processor?: string;
  harddisk?: string;
  diskusage?: string;
  memory?: string;
  shared?: number;
  created_at?: Date;
  modified_at?: Date;
  nama_fasilitas?: string;
  fungsi?: string;
  luas_ruangan?: string;
  jumlah_server?: string;
  jumlah_rak?: string;
  bandwidth_local?: string;
  bandwidth_internasional?: string;
  sarana_pendukung?: string;
  software_data_center?: string;
  tenaga_ahli_data_center?: string;
  tata_kelola_data_center?: string;
  sistem_pengamanan?: string;
  sertifikasi_kelayakan?: string;
  lokasi?: string;
  fasilitas_data_center?: number;
}

@Table({ tableName: 'sis_hardware', schema: 'public', timestamps: false })
export class sis_hardware
  extends Model<sis_hardwareAttributes, sis_hardwareAttributes>
  implements sis_hardwareAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_hardware_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  pemilik?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  data_center?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  diskspace?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  bandwidth?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jumlah?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  tipe?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  processor?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  harddisk?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  diskusage?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  memory?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  shared?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  nama_fasilitas?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  fungsi?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  luas_ruangan?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jumlah_server?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jumlah_rak?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  bandwidth_local?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  bandwidth_internasional?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  sarana_pendukung?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  software_data_center?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  tenaga_ahli_data_center?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  tata_kelola_data_center?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  sistem_pengamanan?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  sertifikasi_kelayakan?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  lokasi?: string;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  fasilitas_data_center?: number;
}
