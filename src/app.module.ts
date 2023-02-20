import { Module } from "@nestjs/common";
import { CompanyController } from "./controllers/companys/companyController";
import { CompanyService } from "./services/company/company.service";
import { UsersController } from "./controllers/users/users.controller";
import { UsersService } from "./services/users/users.service";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./auth/jwt.strategy";
import { ArticleController } from "./controllers/articles/articleController";
import { ArticleService } from "./services/article/article.service";

@Module({
  imports: [JwtModule.register({
    secret: 'initialSecret',
    signOptions: {expiresIn: '1h'}
  })],
  controllers: [CompanyController, UsersController, ArticleController],
  providers: [CompanyService, UsersService, ArticleService, JwtStrategy],
})

export class AppModule {}
