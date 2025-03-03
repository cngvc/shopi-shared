import { Response } from 'express';
import { ReasonPhrases, StatusCodes } from 'http-status-codes';

class SuccessResponse {
  message: string;
  status: number;
  metadata: any;

  constructor(
    message: string,
    status = StatusCodes.OK,
    reasonStatusCode = ReasonPhrases.OK,
    metadata = {}
  ) {
    this.message = message ? message : reasonStatusCode;
    this.status = status;
    this.metadata = metadata;
  }

  send(res: Response, headers = {}) {
    return res.status(this.status).json(this);
  }
}

export class OkRequestSuccess extends SuccessResponse {
  constructor(message: string, metadata: any) {
    super(message, metadata);
  }
}

export class CreatedRequestSuccess extends SuccessResponse {
  constructor(message: string, metadata: any) {
    super(message, StatusCodes.CREATED, ReasonPhrases.CREATED, metadata);
  }
}
