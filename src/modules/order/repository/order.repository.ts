import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { OrderEntity } from '@modules/order/entity/order.entity';
import { errors } from '@errors/errors';
import { INewOrder } from '@modules/order/interface/order.Interface';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';

@EntityRepository(OrderEntity)
export class OrderRepository extends BaseRepository<OrderEntity> {
  async findByIdOrReject(id: number): Promise<OrderEntity> {
    const order = await this.findOne(id);
    if (!order) {
      throw errors.OrderNotFound;
    }
    return order;
  }

  async getNewOrder(
    data: INewOrder,
    menuItems: MenuItemEntity[],
  ): Promise<OrderEntity> {
    return this.save(new OrderEntity({ ...data, menuItems }));
  }
}
