import { ApiProperty, PartialType } from '@nestjs/swagger';
import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongoose';
import { MongoId } from '../decorators/mongo-id.decorator';
@Exclude()
export class UserDTO {
  @ApiProperty()
  @Expose()
  @MongoId()
  _id: ObjectId;
  @ApiProperty()
  @Expose()
  username: string;
  @ApiProperty()
  @Expose()
  email: string;
  @ApiProperty()
  @Expose()
  password: string;
}

export class CreateUserDTO {
  @ApiProperty()
  @IsNotEmpty()
  username: string;
  @ApiProperty()
  @IsNotEmpty()
  email: string;
  @ApiProperty()
  @IsNotEmpty()
  password: string;
}

export class UpdateUserDTO extends PartialType(CreateUserDTO) {}
