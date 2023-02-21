import { Body, Controller, Get, Post, UseGuards } from "@nestjs/common";
import { UsersService } from "./services/users.service";
import { CreateUserDto } from "./dtos/createUser.dto";
import { LoginUserDto } from "./dtos/loginUser.dto";
import { JwtAuthGuard } from "../auth/jwt.auth.guard";

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Post('login')
  login (@Body() loginUser: LoginUserDto) {
    return this.usersService.login(loginUser);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}
