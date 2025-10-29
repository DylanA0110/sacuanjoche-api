import { NotFoundException } from '@nestjs/common';
import { Repository, FindOptionsWhere } from 'typeorm';

export async function findEntityOrFail<T extends object>(
  repository: Repository<T>,
  where: FindOptionsWhere<T>,
  errorMessage?: string,
): Promise<T> {
  const record = await repository.findOne({ where });

  if (!record) {
    throw new NotFoundException(errorMessage ?? `Record not found.`);
  }

  return record;
}
