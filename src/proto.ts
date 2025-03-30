import { loadSync } from '@grpc/proto-loader';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';

const loadProto = (
  filename: string,
  config = {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true,
  } as protoLoader.Options
) => {
  const packageDefinition = loadSync(
    require.resolve(`./proto/${filename}`),
    config
  );
  return grpc.loadPackageDefinition(packageDefinition);
};

export const authProto = loadProto('auth.proto')['auth'];
export const cartProto = loadProto('cart.proto')['cart'];
export const userProto = loadProto('user.proto')['user'];
export const productProto = loadProto('product.proto')['product'];
export const paymentProto = loadProto('payment.proto')['payment'];
export const balanceProto = loadProto('balance.proto')['balance'];
