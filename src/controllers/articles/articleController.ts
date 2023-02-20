import { Body, Controller, Delete, Get, Param, Post } from "@nestjs/common";
import { ArticleService } from "../../services/article/article.service";
import { ArticleDto } from "../../dtos/article/articleDto";

@Controller('articles')
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.articleService.findOne(id);
  }

  @Post()
  create(@Body() body: ArticleDto) {
    return this.articleService.create(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.articleService.remove(id);
  }
}
