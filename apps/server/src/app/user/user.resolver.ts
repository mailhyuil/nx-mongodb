import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO, User } from './user.model';
import { UserService } from './user.service';

@Resolver((of) => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query((returns) => User)
  async user(@Args('id', { type: () => String }) id: string) {
    return await this.userService.findById(id);
  }

  @Query((returns) => [User])
  async users() {
    return await this.userService.findAll();
  }

  @Mutation((returns) => User)
  async create(@Args('user') user: CreateUserDTO) {
    const createdUser = await this.userService.create(user);
    return createdUser;
  }
}
