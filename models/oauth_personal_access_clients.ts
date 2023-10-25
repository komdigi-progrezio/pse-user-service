import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface oauth_personal_access_clientsAttributes {
  id?: string;
  client_id?: string;
  created_at?: Date;
  updated_at?: Date;
}

@Table({
  tableName: 'oauth_personal_access_clients',
  schema: 'public',
  timestamps: false,
})
export class oauth_personal_access_clients
  extends Model<
    oauth_personal_access_clientsAttributes,
    oauth_personal_access_clientsAttributes
  >
  implements oauth_personal_access_clientsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.BIGINT,
    defaultValue: Sequelize.literal(
      "nextval('oauth_personal_access_clients_id_seq'::regclass)",
    ),
  })
  id?: string;

  @Column({ allowNull: true, type: DataType.BIGINT })
  client_id?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
}
