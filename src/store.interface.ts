import { ObjectId } from 'mongoose';
import { IRatingCategories } from './review.interface';

export type StoreType =
  | string
  | string[]
  | number
  | IRatingCategories
  | Date
  | unknown
  | undefined;

export interface IStoreDocument extends Record<string, StoreType> {
  _id?: string | ObjectId;
  profilePublicId?: string;
  fullName: string;
  username?: string;
  email?: string;
  profilePicture?: string;
  description: string;
  ratingsCount?: number;
  ratingSum?: number;
  ratingCategories?: IRatingCategories;
  responseTime: number;
  socialLinks: string[];
  completedOrders?: number;
  cancelledOrders?: number;
  totalEarnings?: number;
  totalProducts?: number;
  createdAt?: Date | string;
}
