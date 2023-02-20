import { Injectable, NotFoundException } from "@nestjs/common";
import { Article } from "../../entities/company/company";
import { v4 as uuid } from "uuid";

@Injectable()
export class ArticleService {

  private articles: Article[] = [];

  findAll() {
    return this.articles;
  }

  findOne(id: string) {
    const art = this.articles.find((item) => item.id === id);
    if (!art) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return art;
  }

  create(body: any) {
    const newArticle = {
      id: uuid(),
      ...body,
    };
    this.articles.push(newArticle);
    return newArticle;
  }

  remove(id: string) {
    const index = this.articles.findIndex((item) => item.id === id);
    if (index <= 0) {
      throw new NotFoundException(`Not found ${id}`);
    }
    this.articles.splice(index, 1);
    return true;
  }
}
