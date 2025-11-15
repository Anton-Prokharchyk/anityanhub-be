import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

import { PrismaClientKnownRequestError } from 'generated/prisma/internal/prismaNamespace';
import { errorsMessages } from 'src/common/errors-messgaes.constants';

enum PrismaErrors {
  UniqueConstraintFailed = 'P2002',
  ForeignKeyFailed = 'P2003',
}

const prismaErrorsResponseMapper: Record<
  string,
  { statusCode: number; msg: string }
> = {
  [PrismaErrors.UniqueConstraintFailed]: {
    statusCode: 409,
    msg: 'Record already exists',
  },
  [PrismaErrors.ForeignKeyFailed]: {
    statusCode: 400,
    msg: 'Invalid relation',
  },
};

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  // Send common response
  private sendResponse(
    res: Response,
    statusCode: number = 500,
    msg: string = errorsMessages.INTERNAL_SERVER_ERROR,
  ) {
    res.status(statusCode).json({
      status: statusCode,
      message: msg,
      timestamp: new Date().toISOString(),
    });
  }

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse<Response>();

    // PrismaClientKnownReuqestError errors handling
    if (exception instanceof PrismaClientKnownRequestError) {
      const mapped = prismaErrorsResponseMapper[exception.code];
      if (mapped) {
        return this.sendResponse(res, mapped.statusCode, mapped.msg);
      }
      return this.sendResponse(
        res,
        HttpStatus.INTERNAL_SERVER_ERROR,
        errorsMessages.INTERNAL_SERVER_ERROR,
      );
    }

    // 2. HttpException errors handling
    if (exception instanceof HttpException) {
      return this.sendResponse(res, exception.getStatus(), exception.message);
    }

    // 3. All uncaught errors handling
    return this.sendResponse(
      res,
      HttpStatus.INTERNAL_SERVER_ERROR,
      errorsMessages.INTERNAL_SERVER_ERROR,
    );
  }
}
