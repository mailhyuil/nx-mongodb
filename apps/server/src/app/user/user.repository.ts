import { User } from '@mongo/libs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import mongoose, { Connection, Model } from 'mongoose';
@Injectable()
export class UserRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(User.name) private userModel: Model<User>
  ) {}

  async findAll(): Promise<User[]> {
    return this.userModel.find().catch((e) => {
      throw new BadRequestException('User을 찾을 수 없습니다.');
    });
  }

  async findById(id: string): Promise<User> {
    const found = await this.userModel.findById(id).catch((e) => {
      throw new BadRequestException('User을 찾을 수 없습니다.');
    });
    return found;
  }

  async create(user: User): Promise<User> {
    const created = new this.userModel(user);
    return created.save().catch((e) => {
      throw new BadRequestException('User을 생성할 수 없습니다.');
    });
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    const updated = await this.userModel
      .findByIdAndUpdate(id, user, {
        new: true,
      })
      .catch((e) => {
        throw new BadRequestException('User을 수정할 수 없습니다.');
      });
    return updated;
  }

  async delete(id: string) {
    console.log(id);
    const _id = new mongoose.Types.ObjectId(id);
    console.log(_id);
    await this.userModel.findByIdAndDelete(_id).catch((e) => {
      console.error(e);
      throw new BadRequestException('User을 삭제할 수 없습니다.');
    });
  }
}
