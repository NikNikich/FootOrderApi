import { ApiTags } from '@nestjs/swagger';
import { Controller } from '@nestjs/common';
import { AddressService } from '@modules/address/address.service';

@ApiTags('address')
@Controller('address')
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
}
