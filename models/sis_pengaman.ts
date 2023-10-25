import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_pengamanAttributes {
  id?: number;
  nama_sistem?: string;
  sis_profil_id?: number;
  keterangan?: string;
  created_at?: Date;
  modified_at?: Date;
  status_data?: number;
}

@Table({ tableName: 'sis_pengaman', schema: 'public', timestamps: false })
export class sis_pengaman
  extends Model<sis_pengamanAttributes, sis_pengamanAttributes>
  implements sis_pengamanAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_pengaman_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama_sistem?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  status_data?: number;
}
