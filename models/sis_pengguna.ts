import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_penggunaAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis_pengguna?: string;
  keterangan?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_pengguna', schema: 'public', timestamps: false })
export class sis_pengguna
  extends Model<sis_penggunaAttributes, sis_penggunaAttributes>
  implements sis_penggunaAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_pengguna_id_seq'::regclass)"),
  })
  @Index({ name: 'sis_pengguna_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis_pengguna?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
