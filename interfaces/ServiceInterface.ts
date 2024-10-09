import { CreateReturnDto } from './dto/create.dto';
import { UpdateReturnDto } from './dto/update.dto';
import { FindOneReturnDto, FindAllDto, FindAllReturnDto } from './dto/find.dto';

export interface ServiceInterface<T> {
    delete(id: number): Promise<any>

    create(object: T): Promise<CreateReturnDto<T>>

    findOne(id: number): Promise<FindOneReturnDto<T>>

    findAll(options: FindAllDto<T>): Promise<FindAllReturnDto<T>>

    update(id: number, object: Partial<T>): Promise<UpdateReturnDto<T>>
}