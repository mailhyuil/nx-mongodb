import { CreatePostDTO, UpdatePostDTO } from '@mongo/libs';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { PostService } from './post.service';

@ApiTags('Post')
@Controller({ path: 'posts', version: '1' })
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  @ApiOperation({
    summary: '모든 Post 목록 조회',
  })
  async findAll() {
    return await this.postService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Post id로 조회',
  })
  async findById(@Param('id') id: string) {
    return await this.postService.findById(id);
  }

  @Post()
  @ApiOperation({
    summary: 'Post 생성',
  })
  async create(@Body() body: CreatePostDTO) {
    return await this.postService.create(body);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Post 수정',
  })
  async update(@Param('id') id: string, @Body() body: UpdatePostDTO) {
    return await this.postService.update(id, body);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Post 삭제',
  })
  async delete(@Param('id') id: string) {
    return await this.postService.delete(id);
  }
}
