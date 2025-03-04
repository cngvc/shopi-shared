import mongoose, { ObjectId } from 'mongoose';
import { IProductDocument } from './product.interface';
import { IStoreDocument } from './store.interface';

export interface IConversationDocument {
  _id: mongoose.Types.ObjectId | string;
  conversationId: string;
  senderUsername: string;
  receiverUsername: string;
}

export interface IMessageDocument {
  _id?: string | ObjectId;
  conversationId?: string;
  body?: string;
  productId?: string;
  storeId?: string;
  buyerId?: string;
  senderUsername?: string;
  receiverUsername?: string;
  isRead?: boolean;
  createdAt?: Date | string;
}

export interface IMessageDetails {
  sender?: string;
  buyerUsername?: string;
  storeUsername?: string;
  title?: string;
  description?: string;
}

export interface IChatBoxProps {
  store: IChatStoreProps;
  buyer: IChatBuyerProps;
  productId: string;
  onClose: () => void;
}

export interface IChatStoreProps {
  _id: string;
  username: string;
  responseTime: number;
}

export interface IChatBuyerProps {
  _id: string;
  username: string;
}

export interface IChatMessageProps {
  message: IMessageDocument;
  store?: IStoreDocument;
  product?: IProductDocument;
}
