import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface account_log_migrationAttributes {
  id?: number;
  username?: string;
  password?: string;
  nama?: string;
  nip?: string;
  jabatan?: string;
  email?: string;
  no_telepon?: string;
  satuan_kerja?: string;
  alamat?: string;
  kota?: string;
  propinsi?: string;
  kode_pos?: string;
  instansi_induk?: number;
  dokumen?: string;
  created_at?: Date;
  modified_at?: Date;
  status?: number;
  keycode?: string;
  last_login?: Date;
  ip_address?: string;
  instansi_induk_text?: string;
  is_admin?: number;
  parent_id?: number;
  last_logout?: Date;
  status_register?: number;
  replace_by_account_id?: number;
  user_report?: boolean;
  no_hp?: string;
}

@Table({
  tableName: 'account_log_migration',
  schema: 'public',
  timestamps: false,
})
export class account_log_migration
  extends Model<
    account_log_migrationAttributes,
    account_log_migrationAttributes
  >
  implements account_log_migrationAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('account_log_migration_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'account_log_migration_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  username?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  password?: string;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  nama?: string;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  nip?: string;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  jabatan?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  email?: string;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  no_telepon?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  satuan_kerja?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  alamat?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  kota?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  propinsi?: string;

  @Column({ allowNull: true, type: DataType.STRING(5) })
  kode_pos?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  instansi_induk?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  dokumen?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  status?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  keycode?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  last_login?: Date;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  ip_address?: string;

  @Column({ allowNull: true, type: DataType.STRING(250) })
  instansi_induk_text?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  is_admin?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  parent_id?: number;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  last_logout?: Date;

  @Column({ allowNull: true, type: DataType.INTEGER })
  status_register?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  replace_by_account_id?: number;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  user_report?: boolean;

  @Column({ allowNull: true, type: DataType.STRING(20) })
  no_hp?: string;
}
