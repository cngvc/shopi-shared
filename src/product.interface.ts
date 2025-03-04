import { ObjectId } from 'mongoose';
import { IRatingCategories } from './review.interface';

export type ProductType = string | string[] | number | unknown | undefined;

export interface ICreateProduct extends Record<string, ProductType> {
  storeId?: string;
  name: string;
  thumb?: string;
  quantity?: number;
  description: string;
  isPublished?: boolean;
  price: number;
}

export interface IProductDocument {
  _id?: string | ObjectId;
  id?: string | ObjectId;
  storeId?: string | ObjectId;
  name: string;
  thumb?: string;
  quantity?: number;
  description: string;
  slug?: string;
  isPublished?: boolean;
  ratingsCount?: number;
  ratingSum?: number;
  ratingCategories?: IRatingCategories;
  price: number;
  createdAt?: Date | string;
  toJSON?: () => unknown;
}
