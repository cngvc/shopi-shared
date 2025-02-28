export const ExchangeNames = {
  AUTH_NOTIFICATION_EMAIL: 'send-auth-notification-email',
} as const satisfies Record<string, string>;

export const RoutingKeys = {
  AUTH_NOTIFICATION_EMAIL: 'auth-notification-email',
} as const satisfies Record<string, string>;

export const QueueNames = {
  AUTH_NOTIFICATION_EMAIL: 'auth-notification-email-queue',
} as const satisfies Record<string, string>;
