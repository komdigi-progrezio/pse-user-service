import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface par_kotaAttributes {
  id?: number;
  nama?: string;
  id_propinsi?: number;
}

@Table({ tableName: 'par_kota', schema: 'public', timestamps: false })
export class par_kota
  extends Model<par_kotaAttributes, par_kotaAttributes>
  implements par_kotaAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('par_kota_id_seq'::regclass)"),
  })
  @Index({ name: 'par_kota_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  id_propinsi?: number;
}
