import { CreatePostDTO, PostDTO, UpdatePostDTO } from '@mongo/libs';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { PostRepository } from './post.repository';

@Injectable()
export class PostService {
  constructor(private readonly postRepository: PostRepository) {}

  async findAll() {
    const found = await this.postRepository.findAll();
    return plainToInstance(PostDTO, found);
  }

  async findById(id: string) {
    const found = await this.postRepository.findById(id);
    return plainToInstance(PostDTO, found);
  }

  async create(data: CreatePostDTO) {
    const created = await this.postRepository.create(data);
    return plainToInstance(PostDTO, created);
  }

  async update(id: string, data: UpdatePostDTO) {
    const updated = await this.postRepository.update(id, data);
    return plainToInstance(PostDTO, updated);
  }

  async delete(id: string) {
    const deleted = await this.postRepository.delete(id);
    return deleted;
  }
}
