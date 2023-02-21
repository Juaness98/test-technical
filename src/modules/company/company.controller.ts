import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from "@nestjs/common";
import { CompanyService } from "./services/company.service";
import { UpdateCompanyDto } from "./dtos/updateCompany.dto";
import { CompanyEntity } from "./entities/company.entity";
import { CreateCompanyDto } from "./dtos/createCompany.dto";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";

@Controller('company')
@UseGuards(JwtAuthGuard)
export class CompanyController {
  constructor(private companyService: CompanyService) {}

  @Get()
  getAll() {
    return this.companyService.findAll();
  }

  @Get(':id')
  getProduct(@Param('id') id: string) {
    return this.companyService.findOne(id);
  }

  @Post()
  create(@Body() body: CreateCompanyDto) {
    return this.companyService.create(body);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCompanyDto): Promise<CompanyEntity> {
    return this.companyService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
