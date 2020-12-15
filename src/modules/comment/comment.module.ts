import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentRepository } from '@modules/comment/repository/comment.repository';
import { CommentService } from '@modules/comment/comment.service';

@Module({
  imports: [TypeOrmModule.forFeature([CommentRepository])],
  providers: [CommentService],
  exports: [CommentService],
})
export class CommentModule {}
