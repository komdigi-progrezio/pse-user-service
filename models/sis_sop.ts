import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_sopAttributes {
  id?: number;
  sis_profil_id?: number;
  nama_sop?: string;
  keterangan?: string;
  created_at?: Date;
  modified_at?: Date;
  status_data?: number;
}

@Table({ tableName: 'sis_sop', schema: 'public', timestamps: false })
export class sis_sop
  extends Model<sis_sopAttributes, sis_sopAttributes>
  implements sis_sopAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_sop_id_seq'::regclass)"),
  })
  @Index({ name: 'sis_sop_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  nama_sop?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  status_data?: number;
}
