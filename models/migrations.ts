import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface migrationsAttributes {
  id?: number;
  migration?: string;
  batch?: number;
}

@Table({ tableName: 'migrations', schema: 'public', timestamps: false })
export class migrations
  extends Model<migrationsAttributes, migrationsAttributes>
  implements migrationsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal("nextval('migrations_id_seq'::regclass)"),
  })
  @Index({ name: 'migrations_pkey', using: 'btree', unique: true })
  id?: number;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  migration?: string;

  @Column({ allowNull: true, type: DataType.INTEGER })
  batch?: number;
}
