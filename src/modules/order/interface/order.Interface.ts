import { OrderStatuses } from '@modules/order/enum/order-status.enum';

export interface INewOrder {
  name: string;
  status: OrderStatuses;
  price: number;
  description: string;
  userId: number;
  addressId: number;
  restaurantId: number;
}
