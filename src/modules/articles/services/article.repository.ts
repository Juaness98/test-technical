import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { ArticleEntity } from "../entities/article.entity";
import { ArticleDto } from "../dtos/article.dto";
import { CompanyService } from "../../company/services/company.service";

@Injectable()
export class ArticleRepository {
  constructor(@InjectRepository(ArticleEntity) private repository: Repository<ArticleEntity>) { }

  @Inject(CompanyService)
  private readonly companyService: CompanyService;

  findAll(): Promise<ArticleEntity[]>{
    return this.repository.find();
  }

  async findOne(id: string): Promise<ArticleEntity> {
    const article = await this.repository.findOneBy({ id });
    if (article){
      return article
    }
    throw new NotFoundException(`Article not found`);
  }

  async findByCompany(id: string): Promise<ArticleEntity[]> {
    const articles = await this.repository.find({ where: {company: {nit: id}}});
    if (articles){
      return articles
    }
    throw new NotFoundException(`Article not found`);
  }

  async create(article: ArticleDto): Promise<ArticleEntity> {
    const company = await this.companyService.findOne(article.companyId)
    if (company){
      const toSave = this.repository.create(article)
      toSave.company = company
      return this.repository.save(toSave)
    }
    throw new NotFoundException(`Not found product ${article.companyId}`)
  }

  async delete(id: string) {
    const article = await this.findOne(id);
    await this.repository.remove(article);
  }
}
