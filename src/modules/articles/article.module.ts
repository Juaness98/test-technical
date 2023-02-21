import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ArticleEntity } from "./entities/article.entity";
import { ArticleController } from "./article.controller";
import { ArticleService } from "./services/article.service";
import { ArticleRepository } from "./services/article.repository";
import { CompanyModule } from "../company/company.module";

@Module({
  imports: [TypeOrmModule.forFeature([ArticleEntity]), CompanyModule],
  controllers: [ArticleController],
  providers: [ArticleService, ArticleRepository],
})
export class ArticleModule {}
