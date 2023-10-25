import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_instansiAttributes {
  id?: number;
  parent_id?: number;
  name?: string;
  created_at?: Date;
  modified_at?: Date;
  alamat?: string;
  kota?: number;
  propinsi?: number;
  kode_pos?: string;
  approved?: number;
  website?: string;
  kategori?: string;
  kelompok?: number;
}

@Table({ tableName: 'par_instansi', schema: 'public', timestamps: false })
export class par_instansi
  extends Model<par_instansiAttributes, par_instansiAttributes>
  implements par_instansiAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_instansi_id_seq'::regclass)"),
  })
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
  approved?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  website?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  kategori?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  kelompok?: number;
}
