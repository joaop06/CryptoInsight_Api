import { DeleteDto } from './dto/delete.dto';
import { CreateReturnDto } from './dto/create.dto';
import { UpdateReturnDto } from './dto/update.dto';
import { FindOneDto, FindOneReturnDto, FindAllDto, FindAllReturnDto } from './dto/find.dto';

export interface ControllerInterface<Entity> {
    delete(id: string): Promise<any>

    create(object: Entity): Promise<CreateReturnDto<Entity>>

    findOne(id: string): Promise<FindOneReturnDto<Entity>>

    findAll(options: FindAllDto<Entity>): Promise<FindAllReturnDto<Entity>>

    update(id: string, object: Partial<Entity>): Promise<UpdateReturnDto<Entity>>
}