import { IsNotEmpty } from "class-validator";
import { PartialType } from "@nestjs/mapped-types";
import { LoginUserDto } from "./loginUser.dto";

export class CreateUserDto extends PartialType(LoginUserDto) {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  role: string
}
