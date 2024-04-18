import { BadRequestException } from '@nestjs/common';

export function handleError(error: Error) {
  const oi = error.message;
  const ola = oi.slice(oi.length - 54);
  throw new BadRequestException(ola);
  return undefined;
}
