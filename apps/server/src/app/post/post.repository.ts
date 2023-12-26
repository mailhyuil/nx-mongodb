import { CreatePostDTO } from '@mongo/libs';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Connection, Model } from 'mongoose';
import { Post } from './post.schema';

@Injectable()
export class PostRepository {
  constructor(
    @InjectConnection() private connection: Connection,
    @InjectModel(Post.name) private postModel: Model<Post>
  ) {}

  async findAll(): Promise<Post[]> {
    return this.postModel.find().catch((e) => {
      throw new BadRequestException('Post을 찾을 수 없습니다.');
    });
  }

  async findById(id: string): Promise<Post> {
    const found = await this.postModel.findById(id).catch((e) => {
      throw new BadRequestException('Post을 찾을 수 없습니다.');
    });
    return found;
  }

  async create(data: CreatePostDTO): Promise<Post> {
    const { title, content } = data;

    const post = new this.postModel();
    post.title = title;
    post.content = content;

    const created = new this.postModel(post);
    return created.save().catch((e) => {
      throw new BadRequestException('Post을 생성할 수 없습니다.');
    });
  }

  async update(id: string, post: Partial<Post>): Promise<Post> {
    const updated = await this.postModel
      .findByIdAndUpdate(id, post, {
        new: true,
      })
      .catch((e) => {
        throw new BadRequestException('Post을 수정할 수 없습니다.');
      });
    return updated;
  }

  async delete(id: string) {
    const deleted = await this.postModel.findByIdAndDelete(id).catch((e) => {
      throw new BadRequestException('Post을 삭제할 수 없습니다.');
    });
    return deleted;
  }
}
