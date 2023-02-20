import { Injectable, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { User } from "../../entities/users/users.entity";
import { v4 as uuid } from "uuid";
import { LoginUserDto } from "../../dtos/users/loginUser.dto";
import { JwtService } from "@nestjs/jwt";

@Injectable()
export class UsersService {
  constructor(private jwt: JwtService) {}

  private users: User[] = [];

  async login(loginUser: LoginUserDto) {
    const user = this.users.find((item) => item.email === loginUser.email);
    if (!user) throw new NotFoundException(`user not found`);
    const checkPassword = loginUser.password === user.password;
    if (!checkPassword) throw new UnauthorizedException('Incorrect password')

    const payload = {id: user.id, name:user.name}
    const token = this.jwt.sign(payload)
    return {user: user, token: token}
  }

  findAll() {
    return this.users;
  }

  findById(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`Not found ${id}`);
    }
    return user;
  }

  create(body: any) {
    const newUser = {
      id: uuid(),
      ...body,
    };
    this.users.push(newUser);
    return newUser;
  }

  update(id: number, body: any) {
    const user = this.findById(id);
    if (user) {
      const index = this.users.findIndex((item) => item.id === id);
      this.users[index] = {
        ...user,
        ...body,
      };
      return this.users[index];
    }
    return null;
  }

  remove(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Not found ${id}`);
    }
    this.users.splice(index, 1);
    return true;
  }
}
