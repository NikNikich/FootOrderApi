import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@modules/order/repository/order.repository';
import { OrderNewRequestDto } from '@modules/order/dto/request/order-new.request.dto';
import { AddressService } from '@modules/address/address.service';
import { RestaurantService } from '@modules/restaurant/restaurant.service';
import { MenuItemService } from '@modules/menu-item/menu-item.service';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';
import { OrderEntity } from '@modules/order/entity/order.entity';
import { OrderStatuses } from '@modules/order/enum/order-status.enum';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly addressService: AddressService,
    private readonly restaurantService: RestaurantService,
    private readonly menuItemService: MenuItemService,
  ) {}

  async addNew(
    userId: number,
    data: OrderNewRequestDto,
  ): Promise<OrderEntity> {
    let { addressId } = data;
    const { addressText, description, restaurantId, MenuItem } = data;
    if (!addressId) {
      const address = await this.addressService.addUserAddress(
        userId,
        addressText,
      );
      addressId = address.id;
    }
    const restaurant = await this.restaurantService.getRestaurant(
      restaurantId,
    );
    const menuItems = await this.menuItemService.getRestaurantMenuItemOrReject(
      restaurantId,
      MenuItem,
    );
    const name = this.getNameOrder(restaurant.name);
    const price = this.getPriceOrder(menuItems);
    return this.orderRepository.getNewOrder(
      {
        addressId,
        name,
        price,
        description,
        restaurantId,
        userId,
        status: OrderStatuses.OPEN,
      },
      menuItems,
    );
  }

  private getNameOrder(restaurantName: string): string {
    return `${restaurantName} #${Date.now()}`;
  }

  private getPriceOrder(menuItems: MenuItemEntity[]): number {
    return menuItems.reduce((sum, menuItem) => {
      if (!menuItem.price) {
        return sum;
      }
      return sum + Number(menuItem.price);
    }, 0);
  }
}
