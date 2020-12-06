import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  private readonly tokenCap = 'Bearer ';

  constructor() {}
}
