import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_sertifikatAttributes {
  id?: number;
  sis_profil_id?: number;
  nama_sertifikat?: string;
  nama_institusi?: string;
  tgl_terbit?: string;
  tgl_mulai?: string;
  tgl_expire?: string;
  masa_berlaku?: string;
  no_sertifikat?: string;
  ruang_lingkup?: string;
  dokumen?: string;
  created_at?: Date;
  modified_at?: Date;
  status_data?: number;
}

@Table({ tableName: 'sis_sertifikat', schema: 'public', timestamps: false })
export class sis_sertifikat
  extends Model<sis_sertifikatAttributes, sis_sertifikatAttributes>
  implements sis_sertifikatAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_sertifikat_id_seq'::regclass)",
    ),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama_sertifikat?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama_institusi?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  tgl_terbit?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  tgl_mulai?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  tgl_expire?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  masa_berlaku?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  no_sertifikat?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  ruang_lingkup?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  dokumen?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  status_data?: number;
}
