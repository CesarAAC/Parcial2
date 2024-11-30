export enum BusinessError {
    NOT_FOUND = 'NOT_FOUND',
    PRECONDITION_FAILED = 'PRECONDITION_FAILED',
    INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  }
  
  export class BusinessLogicException extends Error {
    constructor(message: string, public readonly error: BusinessError = BusinessError.INTERNAL_SERVER_ERROR) {
      super(message);
    }
  }