import { IsNotEmpty, IsString } from "class-validator";

export class CreateCompanyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  direction: string;

  @IsNotEmpty()
  nit: string;

  @IsNotEmpty()
  phoneNumber: string;
}
