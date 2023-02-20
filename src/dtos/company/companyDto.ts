import { IsNotEmpty, IsString } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsNotEmpty()
  nit: number;

  @IsNotEmpty()
  phoneNumber: number;
}

export class UpdateCompanyDto extends PartialType(CreateCompanyDto) {}
