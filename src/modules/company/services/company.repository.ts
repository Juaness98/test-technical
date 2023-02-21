import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CompanyEntity } from "../entities/company.entity";
import { UpdateCompanyDto } from "../dtos/updateCompany.dto";
import { CreateCompanyDto } from "../dtos/createCompany.dto";

@Injectable()
export class CompanyRepository {
  constructor(@InjectRepository(CompanyEntity) private companyRepository: Repository<CompanyEntity>) { }

  findAll(): Promise<CompanyEntity[]>{
    return this.companyRepository.find().then(res => {
      if (res) {
        return res;
      } else {
        return null;
      }
    });
  }

  async findOne(nit: string): Promise<CompanyEntity> {
    const company = await this.companyRepository.findOneBy({ nit });
    if (company){
      return company
    }
    throw new NotFoundException(`Company not found`);
  }

  create(company: CreateCompanyDto): Promise<CompanyEntity> {
    const toSave = this.companyRepository.create(company)
    return this.companyRepository.save(toSave)
  }

  async update(id: string, body: UpdateCompanyDto) {
    const company: CompanyEntity = await this.companyRepository.preload({
      nit: id,
      ...body,
    });
    if(!company) {
      throw new NotFoundException(`Company not found`);
    }
    return this.companyRepository.save(company);
  }

  async delete(id: string) {
    const product = await this.findOne(id);
    await this.companyRepository.remove(product);
  }
}
