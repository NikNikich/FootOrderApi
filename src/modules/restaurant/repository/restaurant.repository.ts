import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';
import { errors } from '@errors/errors';

@EntityRepository(RestaurantEntity)
export class RestaurantRepository extends BaseRepository<RestaurantEntity> {
  async getByIdOrReject(id: number): Promise<RestaurantEntity> {
    const restaurant = await this.findOne(id);
    if (!restaurant) {
      throw errors.RestaurantNotFound;
    }
    return restaurant;
  }

  async getByIdWithCommentsOrReject(
    id: number,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!restaurant) {
      throw errors.RestaurantNotFound;
    }
    return restaurant;
  }

  async getByIdWithSelectedUserOrReject(
    id: number,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.findOne({
      where: { id },
      relations: ['selectedUser'],
    });
    if (!restaurant) {
      throw errors.RestaurantNotFound;
    }
    return restaurant;
  }
}
