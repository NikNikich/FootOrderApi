import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RestaurantEntity } from '@modules/restaurant/entity/restaurant.entity';

@EntityRepository(RestaurantEntity)
export class RestaurantRepository extends BaseRepository<RestaurantEntity> {}
