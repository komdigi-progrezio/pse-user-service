import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface account_satuan_kerjaAttributes {
  id?: number;
  account_id?: number;
  satuan_kerja_id?: number;
}

@Table({
  tableName: 'account_satuan_kerja',
  schema: 'public',
  timestamps: false,
})
export class account_satuan_kerja
  extends Model<account_satuan_kerjaAttributes, account_satuan_kerjaAttributes>
  implements account_satuan_kerjaAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('account_satuan_kerja_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'account_satuan_kerja_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  satuan_kerja_id?: number;
}
