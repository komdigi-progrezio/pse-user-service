import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oauth_clientsAttributes {
  id?: string;
  user_id?: string;
  name?: string;
  secret?: string;
  provider?: string;
  redirect?: string;
  personal_access_client?: boolean;
  password_client?: boolean;
  revoked?: boolean;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'oauth_clients', schema: 'public', timestamps: false })
export class oauth_clients
  extends Model<oauth_clientsAttributes, oauth_clientsAttributes>
  implements oauth_clientsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    defaultValue: Sequelize.literal(
      "nextval('oauth_clients_id_seq'::regclass)",
    ),
  })
  @Index({ name: 'oauth_clients_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({ name: 'oauth_clients_user_id_index', using: 'btree', unique: false })
  user_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  secret?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  provider?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  redirect?: string;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  personal_access_client?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  password_client?: boolean;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  revoked?: boolean;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
}
