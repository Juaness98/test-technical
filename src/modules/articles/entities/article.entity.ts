import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CompanyEntity } from "../../company/entities/company.entity";

@Entity('articles')
export class ArticleEntity {
  @PrimaryGeneratedColumn()
  id: string

  @Column()
  name: string

  @ManyToOne(() => CompanyEntity, { onDelete: 'CASCADE' })
  company: CompanyEntity;
}
