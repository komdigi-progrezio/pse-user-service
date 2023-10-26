import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_peripheralAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: string;
  type?: string;
  keterangan?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_peripheral', schema: 'public', timestamps: false })
export class sis_peripheral
  extends Model<sis_peripheralAttributes, sis_peripheralAttributes>
  implements sis_peripheralAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_peripheral_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'sis_peripheral_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  type?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  keterangan?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
