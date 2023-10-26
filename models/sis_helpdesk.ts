import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_helpdeskAttributes {
  id?: number;
  sis_profil_id?: number;
  nama?: string;
  telepon?: string;
  fax?: string;
  email?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_helpdesk', schema: 'public', timestamps: false })
export class sis_helpdesk
  extends Model<sis_helpdeskAttributes, sis_helpdeskAttributes>
  implements sis_helpdeskAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('sis_helpdesk_id_seq'::regclass)"),
  })
  @Index({ name: 'sis_helpdesk_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  nama?: string;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  telepon?: string;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  fax?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  email?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
