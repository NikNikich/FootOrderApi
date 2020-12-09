import { plainToClass } from 'class-transformer';
import { ClassType } from 'class-transformer/ClassTransformer';

export const mapToResponseDto = <ResponseDtoType>(
  responseDto: ClassType<ResponseDtoType>,
  entity: unknown,
): ResponseDtoType =>
  plainToClass(responseDto, entity, {
    excludeExtraneousValues: true,
    enableImplicitConversion: true,
  });
