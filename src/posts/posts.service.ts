import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post } from './posts.model';

@Injectable()
export class PostsService {

    constructor(@InjectModel(Post) private postRepository: typeof Post,
        private fileSevise: FilesService) { }

    async create(dto: CreatePostDto, image: any) {
        const fileName = await this.fileSevise.createFile(image);
        const post = await this.postRepository.create({ ...dto, image: fileName })
        return post;
    }
}
