import { Injectable } from "@nestjs/common";
import { ArticleRepository } from "./article.repository";
import { ArticleDto } from "../dtos/article.dto";

@Injectable()
export class ArticleService {

  constructor(private repository: ArticleRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  findByCompany(id: string) {
    return this.repository.findByCompany(id)
  }

  create(body: ArticleDto) {
    return this.repository.create(body)
  }

  remove(id: string) {
    this.repository.delete(id)
    return 'true';
  }
}
