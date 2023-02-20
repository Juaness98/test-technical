import { Injectable, NotFoundException } from "@nestjs/common";
import { Company } from "../../entities/company/company";
import { v4 as uuid } from "uuid";

@Injectable()
export class CompanyService {
  private companies: Company[] = [];

  findAll() {
    return this.companies;
  }

  findOne(id: string) {
    const prod = this.companies.find((item) => item.id === id);
    if (!prod) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return prod;
  }

  create(body: any) {
    const newCompany = {
      id: uuid(),
      ...body,
    };
    this.companies.push(newCompany);
    return newCompany;
  }

  update(id: string, body: any) {
    const company = this.findOne(id);
    if (company) {
      const index = this.companies.findIndex((item) => item.id === id);
      this.companies[index] = {
        ...company,
        ...body,
      };
      return this.companies[index];
    }
    return null;
  }

  remove(id: string) {
    const index = this.companies.findIndex((item) => item.id === id);
    if (index <= 0) {
      throw new NotFoundException(`Not found ${id}`);
    }
    this.companies.splice(index, 1);
    return true;
  }
}
