import { BadRequestException } from '@nestjs/common';

export function handleError(error: Error) {
  const errorMessage = error.message;
  const errorMessageSliced = errorMessage.slice(errorMessage.length - 54);
  throw new BadRequestException(errorMessageSliced);
  return undefined;
}
