import { EntityRepository, IsNull } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';
import { errors } from '@errors/errors';

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

  async getRestaurantItemOrReject(
    menuItemId: number,
    restaurantId: number,
  ): Promise<MenuItemEntity> {
    const menuItem = await this.getMenuItemOrReject(menuItemId);
    if (restaurantId !== menuItem.restaurantId) {
      throw errors.MenuAnotherRestaurant;
    }
    return menuItem;
  }

  async getMenuItemOrReject(
    menuItemId: number,
  ): Promise<MenuItemEntity> {
    const menuItem = await this.findOne(menuItemId);
    if (!menuItem) {
      throw errors.MenuItemNotFound;
    }
    return menuItem;
  }
}
