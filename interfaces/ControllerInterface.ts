import { DeleteDto } from './dto/delete.dto';
import { CreateReturnDto } from './dto/create.dto';
import { UpdateReturnDto } from './dto/update.dto';
import { FindOneDto, FindOneReturnDto, FindAllDto, FindAllReturnDto } from './dto/find.dto';

export interface ControllerInterface<T> {
    delete(id: DeleteDto): Promise<any>

    create(object: T): Promise<CreateReturnDto<T>>

    findOne(id: FindOneDto): Promise<FindOneReturnDto<T>>

    findAll(options: FindAllDto<T>): Promise<FindAllReturnDto<T>>

    update(id: string, object: Partial<T>): Promise<UpdateReturnDto<T>>
}