import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderEntity } from '@modules/order/entity/order.entity';
import { errors } from '@errors/errors';
import { INewOrder } from '@modules/order/interface/order.Interface';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';
import { OrderStatuses } from '@modules/order/enum/order-status.enum';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {
  async findByIdWithMenuItemOrReject(
    id: number,
  ): Promise<OrderEntity> {
    const order = await this.findOne({
      where: { id },
      relations: ['restaurant', 'address', 'menuItems'],
    });
    if (!order) {
      throw errors.OrderNotFound;
    }
    return order;
  }

  async getUserActiveOrders(userId: number): Promise<OrderEntity[]> {
    return this.find({
      where: [
        {
          userId,
          status: OrderStatuses.OPEN,
        },
        {
          userId,
          status: OrderStatuses.CHECKOUT,
        },
        {
          userId,
          status: OrderStatuses.PAID,
        },
      ],
      relations: ['restaurant', 'address'],
    });
  }

  async getNewOrder(
    data: INewOrder,
    menuItems: MenuItemEntity[],
  ): Promise<OrderEntity> {
    return this.save(new OrderEntity({ ...data, menuItems }));
  }
}
