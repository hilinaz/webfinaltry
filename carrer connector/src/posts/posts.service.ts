import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './post.entity';

@Injectable()
export class PostsService {
    constructor(
        @InjectRepository(Post)
        private postRepository: Repository<Post>,
    ) { }

    create(postData: Partial<Post>): Promise<Post> {
        const post = this.postRepository.create(postData);
        return this.postRepository.save(post);
    }

    findAll(): Promise<Post[]> {
        return this.postRepository.find({ relations: ['user'] });
    }

    findOne(id: number): Promise<Post> {
        return this.postRepository.findOne({ where: { id }, relations: ['user'] });
    }

    update(id: number, updateData: Partial<Post>): Promise<any> {
        return this.postRepository.update(id, updateData);
    }

    remove(id: number): Promise<any> {
        return this.postRepository.delete(id);
    }
}
