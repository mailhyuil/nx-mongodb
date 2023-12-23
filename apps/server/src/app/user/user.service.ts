import { CreateUserDTO, UpdateUserDTO, User, UserDTO } from '@mongo/libs';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAll() {
    const found = await this.userRepository.findAll();
    console.log('findAll', found);
    return plainToInstance(UserDTO, found);
  }

  async findById(id: string) {
    const found = await this.userRepository.findById(id);
    return plainToInstance(UserDTO, found);
  }

  async create(data: CreateUserDTO) {
    const user = new User();
    user.email = data.email;
    user.username = data.username;
    user.password = data.password;
    const created = await this.userRepository.create(user);
    return plainToInstance(UserDTO, created);
  }

  async update(id: string, data: UpdateUserDTO) {
    const updated = await this.userRepository.update(id, data);
    return plainToInstance(UserDTO, updated);
  }

  async delete(id: string) {
    const deleted = await this.userRepository.delete(id);
    return deleted;
  }
}
