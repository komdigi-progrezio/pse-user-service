import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_softwareAttributes {
  sis_profil_id?: number;
  nama?: string;
  jenis?: string;
  kategori?: string;
  vendor?: string;
  created_at?: Date;
  modified_at?: Date;
  id?: number;
  online_url?: string;
  vendor_name?: string;
}

@Table({ tableName: 'sis_software', schema: 'public', timestamps: false })
export class sis_software
  extends Model<sis_softwareAttributes, sis_softwareAttributes>
  implements sis_softwareAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  kategori?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  vendor?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_software_id_seq'::regclass)"),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  online_url?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  vendor_name?: string;
}
