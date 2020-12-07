import { UserService } from '@modules/user/user.service';
import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UserService) {}
}
