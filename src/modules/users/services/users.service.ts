import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { UserEntity } from "../entities/user.entity";
import { LoginUserDto } from "../dtos/loginUser.dto";
import { JwtService } from "@nestjs/jwt";
import { UsersRepository } from "./users.respository";
import { CreateUserDto } from "../dtos/createUser.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class UsersService {
  constructor(private jwt: JwtService, private repository: UsersRepository) {}

  async login(loginUser: LoginUserDto) {
    const user: UserEntity = await this.repository.findOneByEmail(loginUser.email);
    if (!user) throw new NotFoundException(`user not found`);
    const checkPassword = await bcrypt.compare(loginUser.password, user.password);
    if (!checkPassword) throw new UnauthorizedException('Incorrect password')

    const payload = {id: `${user.id}`, name: user.name}
    const token = this.jwt.sign(payload)
    return {user: { name: user.name, role: user.role }, token: token}
  }

  async create(body: CreateUserDto) {
    try {
      body.password = await bcrypt.hash(body.password, 10);
      return this.repository.create(body)
    } catch (e) {
      throw new BadRequestException(e)
    }
  }

  findAll(){
    return this.repository.findAll()
  }
}
