import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_software_toolsAttributes {
  id?: number;
  sis_profil_id?: number;
  jenis?: string;
  deskripsi?: string;
  created_at?: Date;
  modified_at?: Date;
}

@Table({ tableName: 'sis_software_tools', schema: 'public', timestamps: false })
export class sis_software_tools
  extends Model<sis_software_toolsAttributes, sis_software_toolsAttributes>
  implements sis_software_toolsAttributes
{
  @Column({
    primaryKey: true,
    autoIncrement: true,
    type: DataType.INTEGER,
    defaultValue: Sequelize.literal(
      "nextval('sis_software_tools_id_seq'::regclass)",
    ),
  })
  id?: number;

  @Column({ allowNull: true, type: DataType.INTEGER })
  sis_profil_id?: number;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  jenis?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  deskripsi?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;
}
