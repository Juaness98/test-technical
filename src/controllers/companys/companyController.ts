import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CompanyService } from "../../services/company/company.service";
import { CreateCompanyDto, UpdateCompanyDto } from "../../dtos/company/companyDto";

@Controller('company')
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

  @Put(':id')
  update(@Param('id') id: string, @Body() payload: UpdateCompanyDto) {
    return this.companyService.update(id, payload);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.companyService.remove(id);
  }
}
