import { Injectable } from '@nestjs/common';
import { OrderRepository } from '@modules/order/repository/order.repository';
import { OrderNewRequestDto } from '@modules/order/dto/request/order-new.request.dto';
import { AddressService } from '@modules/address/address.service';
import { RestaurantService } from '@modules/restaurant/restaurant.service';
import { MenuItemService } from '@modules/menu-item/menu-item.service';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';
import { OrderEntity } from '@modules/order/entity/order.entity';
import { OrderStatuses } from '@modules/order/enum/order-status.enum';
import { errors } from '@errors/errors';
import { OrderEditRequestDto } from '@modules/order/dto/request/order-edit.request.dto';

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
      addressId = await this.getAddressIdOrder(userId, addressText);
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

  async getOrders(userId: number): Promise<OrderEntity[]> {
    return this.orderRepository.getUserActiveOrders(userId);
  }

  async getOrderWithMenuItems(
    orderId: number,
    userId: number,
  ): Promise<OrderEntity> {
    const order = await this.orderRepository.findByIdWithMenuItemOrReject(
      orderId,
    );
    if (order.userId !== userId) {
      throw errors.OrderAnotherUser;
    }
    return order;
  }

  async updateOrder(
    orderId: number,
    userId: number,
    data: OrderEditRequestDto,
  ): Promise<OrderEntity> {
    const order = await this.getOrderWithMenuItems(orderId, userId);
    this.canChangeOrder(order);
    let { addressId } = data;
    const { addressText, description, MenuItem } = data;
    if (!addressId) {
      addressId = await this.getAddressIdOrder(userId, addressText);
    }
    order.addressId = addressId;
    order.menuItems = await this.menuItemService.getRestaurantMenuItemOrReject(
      order.restaurantId,
      MenuItem,
    );
    order.price = this.getPriceOrder(order.menuItems);
    order.description = description;
    return this.orderRepository.save(order);
  }

  async checkout(
    orderId: number,
    userId: number,
  ): Promise<OrderEntity> {
    const order = await this.getOrderWithMenuItems(orderId, userId);
    this.canChangeOrder(order);
    order.status = OrderStatuses.CHECKOUT;
    return this.orderRepository.save(order);
  }

  private async getAddressIdOrder(
    userId: number,
    addressText: string,
  ): Promise<number> {
    const address = await this.addressService.addUserAddress(
      userId,
      addressText,
    );
    return address.id;
  }

  private canChangeOrder(order: OrderEntity): void {
    if (order.status !== OrderStatuses.OPEN) {
      throw errors.CannotChangeOrder;
    }
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
