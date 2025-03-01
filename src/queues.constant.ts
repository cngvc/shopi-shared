export const ExchangeNames = {
  AUTH_NOTIFICATION_EMAIL: 'send-auth-notification-email',
  USERS_BUYER_UPDATE: 'update-users-buyer',
  USERS_STORE_UPDATE: 'update-users-store',
} as const satisfies Record<string, string>;

export const RoutingKeys = {
  AUTH_NOTIFICATION_EMAIL: 'auth-notification-email',
  USERS_BUYER_UPDATE: 'users-buyer',
  USERS_STORE_UPDATE: 'users-store',
} as const satisfies Record<string, string>;

export const QueueNames = {
  AUTH_NOTIFICATION_EMAIL: 'auth-notification-email-queue',
  USERS_BUYER_UPDATE: 'users-buyer-queue',
  USERS_STORE_UPDATE: 'users-store-queue',
} as const satisfies Record<string, string>;
