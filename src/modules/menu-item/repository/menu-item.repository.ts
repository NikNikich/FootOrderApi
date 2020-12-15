import { EntityRepository, IsNull } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';

@EntityRepository(MenuItemEntity)
export class MenuItemRepository extends BaseRepository<MenuItemEntity> {
  async getRestaurantMenu(
    restaurantId: number,
  ): Promise<MenuItemEntity[]> {
    return this.find({
      where: { restaurantId, categoryId: IsNull() },
      relations: ['positions'],
    });
  }
}
