import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsObject, } from 'class-validator';

export class FindOptionsDto<T> {
    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    skip?: number = 0;

    @IsNumber()
    @IsOptional()
    @Type(() => Number)
    take?: number = 10;

    @IsObject()
    @IsOptional()
    order?: Record<string, 'ASC' | 'DESC'> = { createdAt: 'DESC' };

    @IsObject()
    @IsOptional()
    where?: Partial<T>;

    constructor(partial: Partial<FindOptionsDto<T>>) {
        Object.assign(this, partial);
    }
}