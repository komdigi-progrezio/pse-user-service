import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface account_sis_profilAttributes {
  account_id?: number;
  sis_profil_id?: number;
  created_at?: Date;
  updated_at?: Date;
}

@Table({ tableName: 'account_sis_profil', schema: 'public', timestamps: false })
export class account_sis_profil
  extends Model<account_sis_profilAttributes, account_sis_profilAttributes>
  implements account_sis_profilAttributes
{
  @Column({ allowNull: true, type: DataType.INTEGER })
  account_id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.DATE })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE })
  updated_at?: Date;
}
