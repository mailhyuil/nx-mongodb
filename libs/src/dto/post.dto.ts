import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
import { MongoId } from '../decorators/mongo-id.decorator';
import { UserDTO } from './user.dto';

@Exclude()
export class PostDTO {
  @ApiProperty()
  @Expose()
  @MongoId()
  id: ObjectId;
  @ApiProperty()
  @Expose()
  title: string;
  @ApiProperty()
  @Expose()
  content: string;
  @ApiProperty()
  @Expose()
  user: UserDTO;
}
export class CreatePostDTO {
  @ApiProperty()
  @IsNotEmpty()
  title: string;
  @ApiProperty()
  @IsNotEmpty()
  content: string;
}
export class UpdatePostDTO extends PartialType(CreatePostDTO) {}
