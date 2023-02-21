import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserEntity } from "./entities/user.entity";
import { UsersController } from "./users.controller";
import { UsersService } from "./services/users.service";
import { UsersRepository } from "./services/users.respository";
import { JwtModule } from "@nestjs/jwt";

@Module({
  imports: [
    JwtModule.register({
      secret: 'initialSecret',
      signOptions: {expiresIn: '1h'}
    }),
    TypeOrmModule.forFeature([UserEntity])],
  controllers: [UsersController],
  providers: [UsersService, UsersRepository],
})
export class UsersModule {}
