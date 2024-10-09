export interface FindOneDto {
    id: string;
}

export interface FindOneReturnDto<T> {
    result: T | Partial<T>;
}

export interface FindAllDto<T> {
    skip?: number;
    take?: number;
    order?: object;
    where?: Partial<T>;
}

export interface FindAllReturnDto<T> {
    rows: T[];
    count: number;
}