import { Repository, FindOptionsWhere } from 'typeorm';
export declare function findEntityOrFail<T extends object>(repository: Repository<T>, where: FindOptionsWhere<T>, errorMessage?: string): Promise<T>;
