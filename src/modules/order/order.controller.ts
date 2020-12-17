import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { Body, Controller, Post, Request } from '@nestjs/common';
import { ErrorDto } from '@shared/dto/error.dto';
import { errors } from '@errors/errors';
import { IUserPayloadParams } from '@modules/auth/interface/IUserPayload';
import { mapToResponseDto } from '@shared/functions';
import { Auth } from '@shared/decorators/auth';
import { OrderResponseDto } from '@modules/order/dto/response/order-response.dto';
import { OrderNewRequestDto } from '@modules/order/dto/request/order-new.request.dto';
import { OrderService } from './order.service';

@ApiTags('order')
@Controller('order')
@Auth()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @ApiBody({ type: OrderNewRequestDto })
  @ApiOperation({ summary: 'Add new order' })
  @ApiCreatedResponse({
    type: OrderResponseDto,
    description: 'Order is create',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.AddressNotFound.title,
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.MenuAnotherRestaurant.title,
  })
  async addNewResponse(
    @Request() req: { user: IUserPayloadParams },
    @Body() data: OrderNewRequestDto,
  ): Promise<OrderResponseDto> {
    const result = await this.orderService.addNew(req.user.id, data);
    return mapToResponseDto(OrderResponseDto, result);
  }
}
