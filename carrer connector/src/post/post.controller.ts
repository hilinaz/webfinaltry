import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors,Req } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { post as PostEntity } from './post.entity';
import * as multer from 'multer';
import * as fs from 'fs';
import * as path from 'path';


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadPath = path.join(__dirname, '../../uploads');
    console.log('Destination Path:', uploadPath); 
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath);
    }
    cb(null, uploadPath);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    console.log('Generated Filename:', fileName); 
    cb(null, fileName);
  },
});



@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('create/:userId')
@UseInterceptors(FileInterceptor('photo', {
  storage,
  fileFilter: (req, file, cb) => {
    cb(null, true);
  },
}))
async createPost(
  @Body() createPostDto: CreatePostDto,
  @Param('userId') userId: number,
  @UploadedFile() file: Express.Multer.File,
  @Req() req: Request,
): Promise<PostEntity> {
  console.log('Raw Request Body:', req.body);
  console.log('Raw Request Files:', file);
  if (file) {
    createPostDto.photo = file.path;
  }

  return this.postService.createPost(createPostDto, userId);
}

  @Get('all')
  async getAllPosts(): Promise<PostEntity[]> {
    return this.postService.getAllPosts();
  }
}
