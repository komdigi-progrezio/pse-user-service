import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oauth_auth_codesAttributes {
  id: string;
  user_id?: string;
  client_id?: string;
  scopes?: string;
  revoked?: boolean;
  expires_at?: Date;
}

@Table({ tableName: 'oauth_auth_codes', schema: 'public', timestamps: false })
export class oauth_auth_codes
  extends Model<oauth_auth_codesAttributes, oauth_auth_codesAttributes>
  implements oauth_auth_codesAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(100) })
  @Index({ name: 'oauth_auth_codes_pkey', using: 'btree', unique: true })
  id!: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  @Index({
    name: 'oauth_auth_codes_user_id_index',
    using: 'btree',
    unique: false,
  })
  user_id?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  client_id?: string;

  @Column({ allowNull: true, type: DataType.STRING })
  scopes?: string;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  revoked?: boolean;

  @Column({ allowNull: true, type: DataType.DATE })
  expires_at?: Date;
}
