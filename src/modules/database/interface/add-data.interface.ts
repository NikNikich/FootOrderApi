import { UserRoles } from '@modules/user-role/enum/role.enum';

export interface IAddUser {
  fullName: string;
  email: string;
  password: string;
}

export interface IAddRoles {
  userId: number;
  role: UserRoles;
}

export interface IAddAddress {
  name: string;
  latitude: number;
  longitude: number;
  userId: number;
  isFavorite: boolean;
}

export interface IAddMenu {
  restaurantId: number;
  name: string;
  description: string;
  price?: number;
  categoryId?: number;
}

export interface IAddComment {
  restaurantId: number;
  text: string;
  userId: number;
}

export interface IConstMenu {
  name: string;
  description: string;
  price?: number;
}
