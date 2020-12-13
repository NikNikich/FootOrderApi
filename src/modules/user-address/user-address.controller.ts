import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { UserAddressService } from '@modules/user-address/user-address.service';

@ApiTags('address')
@Controller('address')
export class UserAddressController {
  constructor(
    private readonly userAddressService: UserAddressService,
  ) {}
}
