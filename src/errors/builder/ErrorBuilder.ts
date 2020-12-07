import { HttpException } from '@nestjs/common';

export class APIError extends HttpException {
  statusCode: number;

  code: number;

  title: string;

  meta: string | Record<string, unknown>;

  constructor(
    status: number,
    title: string,
    code?: number,
    meta?: string | Record<string, unknown>,
  ) {
    super(
      {
        error: `${status}`,
        statusCode: status,
        message: title,
        code,
      },
      status,
    );
    this.statusCode = status;
    this.code = code;
    this.title = title;
    this.meta = meta;
  }
}
