import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { RestaurantEntity } from '@modules/database/entity/restaurant.entity';

@EntityRepository(RestaurantEntity)
export class RestaurantRepository extends BaseRepository<RestaurantEntity> {}
