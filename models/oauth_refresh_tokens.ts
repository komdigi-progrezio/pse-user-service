import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oauth_refresh_tokensAttributes {
  id: string;
  access_token_id?: string;
  revoked?: boolean;
  expires_at?: Date;
}

@Table({
  tableName: 'oauth_refresh_tokens',
  schema: 'public',
  timestamps: false,
})
export class oauth_refresh_tokens
  extends Model<oauth_refresh_tokensAttributes, oauth_refresh_tokensAttributes>
  implements oauth_refresh_tokensAttributes
{
  @Column({ primaryKey: true, type: DataType.STRING(100) })
  id!: string;

  @Column({ allowNull: true, type: DataType.STRING(100) })
  access_token_id?: string;

  @Column({ allowNull: true, type: DataType.BOOLEAN })
  revoked?: boolean;

  @Column({ allowNull: true, type: DataType.DATE })
  expires_at?: Date;
}
