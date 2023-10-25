import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_tenaga_ahli_stockAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: string;
  jumlah_personil?: string;
  status?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({
  tableName: 'sis_tenaga_ahli_stock',
  schema: 'public',
  timestamps: false,
})
export class sis_tenaga_ahli_stock
  extends Model<
    sis_tenaga_ahli_stockAttributes,
    sis_tenaga_ahli_stockAttributes
  >
  implements sis_tenaga_ahli_stockAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_tenaga_ahli_stock_id_seq'::regclass)",
    ),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jumlah_personil?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  status?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
