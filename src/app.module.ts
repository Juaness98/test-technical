import { Module } from "@nestjs/common";
import { JwtStrategy } from "./modules/auth/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import * as process from "process";
import { UserEntity } from "./modules/users/entities/user.entity";
import { CompanyEntity } from "./modules/company/entities/company.entity";
import { UsersModule } from "./modules/users/users.module";
import { CompanyModule } from "./modules/company/company.module";
import { ArticleEntity } from "./modules/articles/entities/article.entity";
import { ArticleModule } from "./modules/articles/article.module";

@Module({
  imports: [
    ConfigModule.forRoot({isGlobal: true}),
    TypeOrmModule.forRoot({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_PORT,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        autoLoadEntities: true,
        entities: [UserEntity, CompanyEntity, ArticleEntity],
        synchronize: true,
    }),
    UsersModule,
    CompanyModule,
    ArticleModule
  ],
  controllers: [],
  providers: [JwtStrategy]
})

export class AppModule {}
