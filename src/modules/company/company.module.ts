import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CompanyEntity } from "./entities/company.entity";
import { CompanyController } from "./company.controller";
import { CompanyService } from "./services/company.service";
import { CompanyRepository } from "./services/company.repository";

@Module({
  imports: [TypeOrmModule.forFeature([CompanyEntity])],
  controllers: [CompanyController],
  providers: [CompanyService, CompanyRepository],
  exports: [CompanyService]
})
export class CompanyModule {}
