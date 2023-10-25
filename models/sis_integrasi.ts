import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_integrasiAttributes {
  id?: number;
  sis_profil_id?: number;
  nama_sistem?: string;
  keterangan?: string;
  created_at?: Date;
  modified_at?: Date;
  id_sistem?: number;
}

@Table({ tableName: 'sis_integrasi', schema: 'public', timestamps: false })
export class sis_integrasi
  extends Model<sis_integrasiAttributes, sis_integrasiAttributes>
  implements sis_integrasiAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_integrasi_id_seq'::regclass)",
    ),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama_sistem?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  id_sistem?: number;
}
