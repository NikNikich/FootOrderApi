import { EntityRepository } from 'typeorm';
import { BaseRepository } from 'typeorm-transactional-cls-hooked';
import { MenuItemEntity } from '@modules/database/entity/menu-item.entity';

@EntityRepository(MenuItemEntity)
export class MenuItemRepository extends BaseRepository<MenuItemEntity> {}
