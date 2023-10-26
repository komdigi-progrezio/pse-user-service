import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_ruang_lingkupAttributes {
  id?: number;
  sis_profil_id?: number;
  ruang_lingkup?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_ruang_lingkup', schema: 'public', timestamps: false })
export class sis_ruang_lingkup
  extends Model<sis_ruang_lingkupAttributes, sis_ruang_lingkupAttributes>
  implements sis_ruang_lingkupAttributes
{
  @Column({
    primaryKey: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_ruang_lingkup_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'sis_ruang_lingkup_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  ruang_lingkup?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
