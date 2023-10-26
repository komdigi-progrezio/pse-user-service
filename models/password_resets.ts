import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface password_resetsAttributes {
  email?: string;
  token?: string;
  created_at?: Date;
}

@Table({ tableName: 'password_resets', schema: 'public', timestamps: false })
export class password_resets
  extends Model<password_resetsAttributes, password_resetsAttributes>
  implements password_resetsAttributes
{
  @Column({ allowNull: true, type: DataType.STRING(255) })
  @Index({ name: 'password_resets_email_index', using: 'btree', unique: false })
  email?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  token?: string;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;
}
