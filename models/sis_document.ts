import {
  Model,
  Table,
  Column,
  DataType,
  Index,
  Sequelize,
  ForeignKey,
} from 'sequelize-typescript';

export interface sis_documentAttributes {
  id?: string;
  sis_profil_id?: string;
  name?: string;
  dokumen?: string;
  created_at?: Date;
  modified_at?: Date;
  category?: string;
}

@Table({ tableName: 'sis_document', schema: 'public', timestamps: false })
export class sis_document
  extends Model<sis_documentAttributes, sis_documentAttributes>
  implements sis_documentAttributes
{
  @Column({ primaryKey: true, autoIncrement: true, type: DataType.STRING(255) })
  @Index({ name: 'sis_document_pkey', using: 'btree', unique: true })
  id?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  sis_profil_id?: string;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  name?: string;

  @Column({ allowNull: true, type: DataType.STRING(255) })
  dokumen?: string;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  created_at?: Date;

  @Column({ allowNull: true, type: DataType.DATE(6) })
  modified_at?: Date;

  @Column({ allowNull: true, type: DataType.STRING(50) })
  category?: string;
}
