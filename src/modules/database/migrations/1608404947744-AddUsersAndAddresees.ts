import { getConnection, MigrationInterface } from 'typeorm';
import { UserRoles } from '@modules/user-role/enum/role.enum';
import { addUsers } from '@modules/database/function/add-user.function';
import { hashPassword } from '@shared/functions/hash-password.shared';
import { addRoles } from '@modules/database/function/add-roles.function';
import {
  IAddAddress,
  IAddComment,
  IAddMenu,
  IConstMenu,
} from '@modules/database/interface/add-data.interface';
import { AddressEntity } from '@modules/address/entity/address.entity';
import { ADD_USER_ADDRESSES } from '@modules/database/const/add-address.const';
import { UserEntity } from '@modules/user/entity/user.entity';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { ADD_RESTAURANT } from '@modules/database/const/add-restaurant.const';
import { ADD_COMMENTS } from '@modules/database/const/add-comment.const';
import { CommentEntity } from '@modules/comment/entity/comment.entity';
import {
  ADD_MENU_CATEGORY,
  ADD_MENU_ITEMS,
} from '@modules/database/const/add-menu.const';
import { MenuItemEntity } from '@modules/menu-item/entity/menu-item.entity';

export class AddUsers1608404947743 implements MigrationInterface {
  private readonly users = [
    {
      fullName: 'user1 userovic',
      email: 'user1@email.com',
      password: hashPassword('user1'),
    },
    {
      fullName: 'user2 userovic',
      email: 'user2@email.com',
      password: hashPassword('user2'),
    },
  ];

  public async up(): Promise<void> {
    const saveUsers = await addUsers(this.users);
    const userRoles = saveUsers.map((user) => ({
      userId: user.id,
      role: UserRoles.USER,
    }));
    await addRoles(userRoles);
    const addresses = this.getAddress(saveUsers);
    await this.addAddress(addresses);
    const restaurants = await this.addRestaurant();
    const comments = this.getComments(saveUsers, restaurants);
    await this.addComments(comments);
    const menuCategory = this.getMenuCategory(
      restaurants,
      ADD_MENU_CATEGORY,
    );
    const addedMenuCategories = await this.addMenuItem(menuCategory);
    const menuItems = [];
    await Promise.all(
      addedMenuCategories.map(async (addedMenuCategory, index) => {
        const restaurant = restaurants[Math.trunc(index / 2)];
        const constMenuItem = [
          ADD_MENU_ITEMS[index * 2],
          ADD_MENU_ITEMS[index * 2 + 1],
        ];
        const menuItem = this.getMenuItem(
          restaurant,
          addedMenuCategory,
          constMenuItem,
        );
        menuItems.push(...menuItem);
      }),
    );
    await this.addMenuItem(menuItems);
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  public async down(): Promise<void> {}

  private getAddress(users: UserEntity[]): IAddAddress[] {
    return [
      {
        ...ADD_USER_ADDRESSES[0],
        userId: users[0].id,
        isFavorite: false,
      },
      {
        ...ADD_USER_ADDRESSES[1],
        userId: users[0].id,
        isFavorite: true,
      },
      {
        ...ADD_USER_ADDRESSES[2],
        userId: users[1].id,
        isFavorite: false,
      },
      {
        ...ADD_USER_ADDRESSES[3],
        userId: users[1].id,
        isFavorite: true,
      },
    ];
  }

  private async addAddress(addresses: IAddAddress[]): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(AddressEntity)
      .values(addresses)
      .execute();
  }

  private async addRestaurant(): Promise<RestaurantEntity[]> {
    const addedRestaurant = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(RestaurantEntity)
      .values(ADD_RESTAURANT)
      .execute();
    return addedRestaurant.raw;
  }

  private getComments(
    users: UserEntity[],
    restaurants: RestaurantEntity[],
  ): IAddComment[] {
    return [
      {
        ...ADD_COMMENTS[0],
        userId: users[0].id,
        restaurantId: restaurants[0].id,
      },
      {
        ...ADD_COMMENTS[1],
        userId: users[1].id,
        restaurantId: restaurants[0].id,
      },
      {
        ...ADD_COMMENTS[2],
        userId: users[0].id,
        restaurantId: restaurants[1].id,
      },
      {
        ...ADD_COMMENTS[3],
        userId: users[1].id,
        restaurantId: restaurants[1].id,
      },
    ];
  }

  private async addComments(comments: IAddComment[]): Promise<void> {
    await getConnection()
      .createQueryBuilder()
      .insert()
      .into(CommentEntity)
      .values(comments)
      .execute();
  }

  private getMenuCategory(
    restaurant: RestaurantEntity[],
    constMenus: IConstMenu[],
  ): IAddMenu[] {
    return constMenus.map((constMenu, index) => ({
      ...constMenu,
      restaurantId: restaurant[Math.trunc(index / 2)].id,
    }));
  }

  private getMenuItem(
    restaurant: RestaurantEntity,
    category: MenuItemEntity,
    constMenus: IConstMenu[],
  ): IAddMenu[] {
    return constMenus.map((constMenu) => ({
      ...constMenu,
      restaurantId: restaurant.id,
      categoryId: category.id,
    }));
  }

  private async addMenuItem(
    menuItems: IAddMenu[],
  ): Promise<MenuItemEntity[]> {
    const addedMenuItems = await getConnection()
      .createQueryBuilder()
      .insert()
      .into(MenuItemEntity)
      .values(menuItems)
      .execute();
    return addedMenuItems.raw;
  }
}
