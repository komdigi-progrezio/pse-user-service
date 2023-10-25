import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_tata_kelolaAttributes {
  id?: number;
  sis_profil_id?: number;
  nama_dh?: string;
  no_dh?: string;
  tahun_dh?: string;
  sop?: string;
  jenis_standar?: string;
  created_at?: Date;
  modified_at?: Date;
  keterangan?: string;
  status_data?: number;
}

@Table({ tableName: 'sis_tata_kelola', schema: 'public', timestamps: false })
export class sis_tata_kelola
  extends Model<sis_tata_kelolaAttributes, sis_tata_kelolaAttributes>
  implements sis_tata_kelolaAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_tata_kelola_id_seq'::regclass)",
    ),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  nama_dh?: string;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  no_dh?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  tahun_dh?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  sop?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis_standar?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  status_data?: number;
}
