export const ExchangeNames = {
  SEND_EMAIL: 'send-email',
  USER_CREATED: 'user-created',
} as const satisfies Record<string, string>;

export const RoutingKeys = {
  SEND_EMAIL: 'send.email',
  USER_CREATED: 'user.created',
} as const satisfies Record<string, string>;

export const QueueNames = {
  SEND_EMAIL: 'send.email.queue',
  USER_CREATED: 'user.created.queue',
} as const satisfies Record<string, string>;
