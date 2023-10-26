import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface request_updateAttributes {
  id?: number;
  account_id?: number;
  sis_profil_id?: number;
  reason?: string;
  created_at?: Date;
  updated_at?: Date;
  approved?: boolean;
  approved_at?: Date;
  finished?: boolean;
  finished_at?: Date;
  locked?: boolean;
  locked_at?: Date;
  approved_key?: string;
}

@Table({ tableName: 'request_update', schema: 'public', timestamps: false })
export class request_update
  extends Model<request_updateAttributes, request_updateAttributes>
  implements request_updateAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('request_update_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'request_update_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING })
  reason?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  updated_at?: Date;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  approved?: boolean;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  approved_at?: Date;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  finished?: boolean;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  finished_at?: Date;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  locked?: boolean;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  locked_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  approved_key?: string;
}
