import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oauth_access_tokensAttributes {
  id: string;
  user_id?: string;
  client_id?: string;
  name?: string;
  scopes?: string;
  revoked?: boolean;
  created_at?: Date;
  updated_at?: Date;
  expires_at?: Date;
}

@Table({
  tableName: 'oauth_access_tokens',
  schema: 'public',
  timestamps: false,
})
export class oauth_access_tokens
  extends Model<oauth_access_tokensAttributes, oauth_access_tokensAttributes>
  implements oauth_access_tokensAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(100) })
  @Index({ name: 'oauth_access_tokens_pkey', using: 'btree', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({
    name: 'oauth_access_tokens_user_id_index',
    using: 'btree',
    unique: false,
  })
  user_id?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  client_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  scopes?: string;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  revoked?: boolean;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  expires_at?: Date;
}
