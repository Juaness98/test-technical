import { Body, Controller, Delete, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ArticleService } from "./services/article.service";
import { ArticleDto } from "./dtos/article.dto";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";

@Controller('articles')
@UseGuards(JwtAuthGuard)
export class ArticleController {
  constructor(private articleService: ArticleService) {}

  @Get()
  getAll() {
    return this.articleService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.articleService.findByCompany(id);
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
