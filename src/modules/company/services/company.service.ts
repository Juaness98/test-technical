import { Injectable } from "@nestjs/common";
import { CompanyRepository } from "./company.repository";
import { UpdateCompanyDto } from "../dtos/updateCompany.dto";
import { CreateCompanyDto } from "../dtos/createCompany.dto";

@Injectable()
export class CompanyService {

  constructor(private repository: CompanyRepository) {}

  findAll() {
    return this.repository.findAll();
  }

  findOne(id: string) {
    return this.repository.findOne(id)
  }

  create(body: CreateCompanyDto) {
    return this.repository.create(body)
  }

  update(id: string, body: UpdateCompanyDto) {
    return this.repository.update(id, body);
  }

  remove(id: string) {
    this.repository.delete(id)
    return 'true';
  }
}
