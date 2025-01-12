import { Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { post } from './post.entity';

import { User } from 'src/user/user.entity';

@Module({
  imports:[TypeOrmModule.forFeature([post,User])],
  providers: [PostService],
  controllers: [PostController]
})
export class PostModule {}
