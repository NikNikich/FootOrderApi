import { HttpStatus, ParseIntPipe } from '@nestjs/common';
import { APIError } from '@errors/builder/ErrorBuilder';

export class TransformIntPipe extends ParseIntPipe {
  constructor(message?: string) {
    super({
      exceptionFactory: (error: string) =>
        new APIError(HttpStatus.BAD_REQUEST, message ?? error),
    });
  }
}
