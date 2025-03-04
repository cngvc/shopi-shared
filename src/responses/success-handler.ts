import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

class SuccessResponse {
  message: string;
  status: number;
  metadata: {};

  constructor(
    message: string,
    metadata = {},
    status = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK
  ) {
    this.message = message ? message : reasonStatusCode;
    this.status = status;
    this.metadata = metadata;
  }

  send = (res: Response, headers = {}) => {
    return res.status(this.status).json(this);
  };
}

export class OkRequestSuccess extends SuccessResponse {
  constructor(message: string, metadata: {}) {
    super(message, metadata);
  }
}

export class CreatedRequestSuccess extends SuccessResponse {
  constructor(message: string, metadata: {}) {
    super(message, metadata, StatusCodes.CREATED, ReasonPhrases.CREATED);
  }
}
