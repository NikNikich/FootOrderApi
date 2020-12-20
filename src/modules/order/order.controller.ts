import {
  ApiBody,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Request,
} from '@nestjs/common';
import { ErrorDto } from '@shared/dto/error.dto';
import { errors } from '@errors/errors';
import { IUserPayloadParams } from '@modules/auth/interface/IUserPayload';
import { mapToResponseDto } from '@shared/functions';
import { Auth } from '@shared/decorators/auth';
import { OrderResponseDto } from '@modules/order/dto/response/order.response.dto';
import { OrderNewRequestDto } from '@modules/order/dto/request/order-new.request.dto';
import { OrderWithItemsResponseDto } from '@modules/order/dto/response/order-with-items.response.dto';
import { TransformIntPipe } from '@shared/pipe/transform-int.pipe';
import { OrderEditRequestDto } from '@modules/order/dto/request/order-edit.request.dto';
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
    type: OrderWithItemsResponseDto,
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
  ): Promise<OrderWithItemsResponseDto> {
    const result = await this.orderService.addNew(req.user.id, data);
    return mapToResponseDto(OrderWithItemsResponseDto, result);
  }

  @Get()
  @ApiOperation({ summary: 'Get list active orders' })
  @ApiCreatedResponse({
    type: OrderResponseDto,
    isArray: true,
    description: 'Orders list is downloaded',
  })
  async getOrders(
    @Request() req: { user: IUserPayloadParams },
  ): Promise<OrderResponseDto> {
    const result = await this.orderService.getOrders(req.user.id);
    return mapToResponseDto(OrderResponseDto, result);
  }

  @Get(':orderId')
  @ApiOperation({ summary: 'Get order' })
  @ApiCreatedResponse({
    type: OrderResponseDto,
    isArray: true,
    description: 'Orders is downloaded',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.OrderNotFound.title,
  })
  async getOrderWithMenuItems(
    @Param('orderId', TransformIntPipe) orderId: number,
    @Request() req: { user: IUserPayloadParams },
  ): Promise<OrderWithItemsResponseDto> {
    const result = await this.orderService.getOrderWithMenuItems(
      orderId,
      req.user.id,
    );
    return mapToResponseDto(OrderWithItemsResponseDto, result);
  }

  @Put(':orderId')
  @ApiBody({ type: OrderEditRequestDto })
  @ApiOperation({ summary: 'Edit order' })
  @ApiCreatedResponse({
    type: OrderWithItemsResponseDto,
    description: 'Order is save',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.OrderNotFound.title,
  })
  async updateOrder(
    @Param('orderId', TransformIntPipe) orderId: number,
    @Request() req: { user: IUserPayloadParams },
    @Body() data: OrderEditRequestDto,
  ): Promise<OrderWithItemsResponseDto> {
    const result = await this.orderService.updateOrder(
      orderId,
      req.user.id,
      data,
    );
    return mapToResponseDto(OrderWithItemsResponseDto, result);
  }

  @Put(':orderId/checkout')
  @ApiOperation({ summary: 'Checkout order' })
  @ApiCreatedResponse({
    type: OrderWithItemsResponseDto,
    description: 'Order is checkout',
  })
  @ApiNotFoundResponse({
    type: ErrorDto,
    description: errors.OrderNotFound.title,
  })
  async checkoutOrder(
    @Param('orderId', TransformIntPipe) orderId: number,
    @Request() req: { user: IUserPayloadParams },
  ): Promise<OrderWithItemsResponseDto> {
    const result = await this.orderService.checkout(
      orderId,
      req.user.id,
    );
    return mapToResponseDto(OrderWithItemsResponseDto, result);
  }
}
