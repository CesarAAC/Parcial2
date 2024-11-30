/* eslint-disable prettier/prettier */
export enum BusinessError {
    NOT_FOUND = 'NOT_FOUND',
    PRECONDITION_FAILED = 'PRECONDITION_FAILED',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
    BAD_REQUEST= 'BAD_REQUEST'
  }
  
  export class BusinessLogicException extends Error {
    constructor(
      public readonly message: string,
      public readonly error: BusinessError = BusinessError.INTERNAL_SERVER_ERROR
    ) {
      super(message);
    }
  }