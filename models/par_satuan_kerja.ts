import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_satuan_kerjaAttributes {
  id?: number;
  parent_id?: number;
  name?: string;
  created_at?: Date;
  modified_at?: Date;
  alamat?: string;
  kota?: number;
  propinsi?: number;
  kode_pos?: string;
  instansi_id?: number;
  no_telp?: string;
  website?: string;
}

@Table({
  tableName: 'par_satuan_kerja',
  schema: 'public',
  timestamps: true,
  createdAt: 'created_at',
  updatedAt: 'modified_at',
})
export class par_satuan_kerja
  extends Model<par_satuan_kerjaAttributes, par_satuan_kerjaAttributes>
  implements par_satuan_kerjaAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('par_satuan_kerja_gid_seq'::regclass)",
    ),
  })
  @Index({ name: 'par_instansi_copy_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  parent_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  name?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING })
  alamat?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  kota?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  propinsi?: number;

  @Column({ allowNull: true, type: DataType.STRING(10) })
  kode_pos?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  instansi_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(25) })
  no_telp?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  website?: string;
}
