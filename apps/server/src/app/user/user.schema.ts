import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Post } from '../post/post.schema';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  email: string;

  @Prop(String)
  password: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  posts: Post[];
}

export const UserSchema = SchemaFactory.createForClass(User);
