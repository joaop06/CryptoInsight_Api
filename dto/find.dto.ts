


import { Type } from 'class-transformer';
import { FindManyOptions } from 'typeorm';
import { BadRequestException } from '@nestjs/common';
import { IsNumber, IsOptional, IsObject, validateSync } from 'class-validator';

export class FindReturnDto<T> {
    rows: T[];
    count: number;
}
export class FindDto<T> implements FindManyOptions {
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
    where?: Partial<T>;

    @IsObject()
    @IsOptional()
    order?: Record<string, 'ASC' | 'DESC'> = { createdAt: 'DESC' };

    constructor(query: any) {
        this.skip = query.skip ? Number(query.skip) : this.skip;
        this.take = query.take ? Number(query.take) : this.take;
        this.where = query.where ? JSON.parse(query.where) : {};
        this.order = query.order ? JSON.parse(query.order) : this.order;

        const errors = validateSync(this);
        if (errors.length > 0) {
            throw new BadRequestException('Parâmetros de busca inválidos');
        }
    }
}