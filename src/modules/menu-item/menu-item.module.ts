import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MenuItemService } from '@modules/menu-item/menu-item.service';
import { MenuItemRepository } from '@modules/menu-item/repository/menu-item.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MenuItemRepository])],
  providers: [MenuItemService],
  exports: [MenuItemService],
})
export class MenuItemModule {}
