import { Injectable } from '@nestjs/common';
import { MenuItemResponseDto } from '@modules/menu-item/dto/response/menu-item.response.dto';
import { MenuItemRepository } from '@modules/menu-item/repository/menu-item.repository';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';
import { IdMenuItemRequestDto } from '@modules/menu-item/dto/request/id-menu-item.request.dto';

@Injectable()
export class MenuItemService {
  constructor(
    private readonly menuItemRepository: MenuItemRepository,
  ) {}

  async getRestaurantMenu(
    restaurantId: number,
  ): Promise<MenuItemResponseDto[]> {
    const menu = await this.menuItemRepository.getRestaurantMenu(
      restaurantId,
    );
    return Promise.all(
      menu.map((menuCategory) => {
        const { name, positions } = menuCategory;
        return {
          category: name,
          positions,
        };
      }),
    );
  }

  async getRestaurantMenuItemOrReject(
    restaurantId: number,
    menuItems: IdMenuItemRequestDto[],
  ): Promise<MenuItemEntity[]> {
    return Promise.all(
      menuItems.map(async (menuItem) =>
        this.menuItemRepository.getRestaurantItemOrReject(
          menuItem.idMenuItem,
          restaurantId,
        ),
      ),
    );
  }
}
