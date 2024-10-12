// export interface CreateReturnDto<T> {
//     result: T | Partial<T>;
// }

export class CreateDto<T> {
    constructor(public object: Partial<T>) { }
}

export class CreateReturnDto<T> {
    message?: string;
    constructor(public object: T) { }
}