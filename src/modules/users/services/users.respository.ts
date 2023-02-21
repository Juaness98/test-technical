import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "../entities/user.entity";
import { CreateUserDto } from "../dtos/createUser.dto";

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
  ) {
  }

  async create(user: CreateUserDto): Promise<UserEntity> {
    const toSave = this.usersRepository.create(user)
    return await this.usersRepository.save(toSave)
  }

  findAll(): Promise<UserEntity[]> {
    return this.usersRepository.find();
  }

  findOneByEmail(email: string): Promise<UserEntity> {
    return this.usersRepository.findOneBy({ email });
  }

  async remove(id: string): Promise<void> {
    await this.usersRepository.delete(id);
  }
}
