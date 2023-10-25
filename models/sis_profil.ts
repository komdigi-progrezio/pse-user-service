import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_profilAttributes {
  id?: number;
  account_id?: number;
  nama_internal?: string;
  nama_eksternal?: string;
  deskripsi?: string;
  fungsi?: string;
  cakupan_wilayah?: string;
  keterkaitan_sistem?: number;
  keterkaitan_sistem_text?: string;
  sifat_khusus?: string;
  created_at?: Date;
  modified_at?: Date;
  approved?: number;
  approved_date?: Date;
  no_reg?: number;
  img_badge?: string;
  flag_sistem_pengaman?: number;
  flag_sertifikasi?: number;
  flag_dasar_hukum?: number;
  flag_sop?: number;
  kategori_akses?: string;
  url?: string;
  publish?: number;
  publish_date?: Date;
  deleted?: number;
  flag_tenaga_ahli?: number;
  is_locked?: boolean;
  locked_at?: Date;
  keylock?: string;
  keylock_at?: Date;
  keylock_expired?: Date;
  approved_publish?: boolean;
  approved_publish_date?: Date;
}

@Table({ tableName: 'sis_profil', schema: 'public', timestamps: false })
export class sis_profil
  extends Model<sis_profilAttributes, sis_profilAttributes>
  implements sis_profilAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_profil_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  nama_internal?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama_eksternal?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  deskripsi?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  fungsi?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  cakupan_wilayah?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  keterkaitan_sistem?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  keterkaitan_sistem_text?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  sifat_khusus?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  approved?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  approved_date?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  no_reg?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  img_badge?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_sistem_pengaman?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_sertifikasi?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_dasar_hukum?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_sop?: number;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  kategori_akses?: string;

  @Column({ allowNull: true, type: DataType.STRING(300) })
  url?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  publish?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  publish_date?: Date;

  @Column({
    allowNull: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('0'),
  })
  deleted?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  flag_tenaga_ahli?: number;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  is_locked?: boolean;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  locked_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  keylock?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  keylock_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  keylock_expired?: Date;

  @Column({
    allowNull: true,
    type: DataType.BOOLEAN,
    defaultValue: Sequelize.literal('true'),
  })
  approved_publish?: boolean;

  @Column({
    allowNull: true,
    type: DataType.DATE,
    defaultValue: Sequelize.literal('now()'),
  })
  approved_publish_date?: Date;
}
