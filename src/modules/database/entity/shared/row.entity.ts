import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Type } from 'class-transformer';
import { ConstructableEntity } from '@modules/database/entity/shared/constructable.entity';

export class RowEntity<
  T = RowEntity<Record<string, unknown>>
> extends ConstructableEntity<T> {
  @PrimaryGeneratedColumn()
  readonly id?: number;

  @CreateDateColumn({ type: 'timestamp with time zone' })
  @Type(() => Date)
  readonly createdAt?: Date;

  @UpdateDateColumn({ type: 'timestamp with time zone' })
  @Type(() => Date)
  readonly updatedAt?: Date;
}
