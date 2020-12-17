import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from '@modules/address/address.module';
import { UserRoleModule } from '@modules/user-role/user-role.module';
import { Module } from '@nestjs/common';
import { OrderController } from '@modules/order/order.controller';
import { RestaurantModule } from '@modules/restaurant/restaurant.module';
import { OrderRepository } from '@modules/order/repository/order.repository';
import { OrderService } from '@modules/order/order.service';
import { MenuItemModule } from '@modules/menu-item/menu-item.module';

@Module({
  controllers: [OrderController],
  imports: [
    TypeOrmModule.forFeature([OrderRepository]),
    RestaurantModule,
    AddressModule,
    MenuItemModule,
    UserRoleModule,
  ],
  providers: [OrderService],
  exports: [OrderService],
})
export class OrderModule {}
