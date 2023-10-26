import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface TestAttributes {
  test1?: number;
  test2?: number;
  test3?: number;
}

@Table({ tableName: 'Test', schema: 'public', timestamps: false })
export class Test
  extends Model<TestAttributes, TestAttributes>
  implements TestAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal('nextval(\'"Test_test1_seq"\'::regclass)'),
  })
  @Index({ name: 'Test_pkey', using: 'btree', unique: true })
  test1?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  test2?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  test3?: number;
}
