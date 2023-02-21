import { IsNotEmpty } from "class-validator";

export class ArticleDto {
  @IsNotEmpty()
  name: string

  @IsNotEmpty()
  companyId: string
}

