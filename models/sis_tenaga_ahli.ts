import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_tenaga_ahliAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: string;
  jumlah_personil?: number;
  kompetensi?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_tenaga_ahli', schema: 'public', timestamps: false })
export class sis_tenaga_ahli
  extends Model<sis_tenaga_ahliAttributes, sis_tenaga_ahliAttributes>
  implements sis_tenaga_ahliAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_tenaga_ahli_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'sis_tenaga_ahli_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  jumlah_personil?: number;

  @Column({ allowNull: true, type: DataType.STRING })
  kompetensi?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
