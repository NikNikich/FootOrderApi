import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RestaurantService } from '@modules/restaurant/restaurant.service';
import { RestaurantRepository } from '@modules/restaurant/repository/restaurant.repository';
import { RestaurantController } from '@modules/restaurant/restaurant.controller';
import { MenuItemModule } from '@modules/menu-item/menu-item.module';
import { CommentModule } from '@modules/comment/comment.module';

@Module({
  controllers: [RestaurantController],
  imports: [
    TypeOrmModule.forFeature([RestaurantRepository]),
    MenuItemModule,
    CommentModule,
  ],
  providers: [RestaurantService],
  exports: [RestaurantService],
})
export class RestaurantModule {}
