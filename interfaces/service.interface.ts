import { FindDto, FindReturnDto } from "../dto/find.dto";

export interface ServiceInterface<Entity, CreateDto> {
    delete(id: number): Promise<any>

    findOne(id: number): Promise<Entity>

    create(object: CreateDto): Promise<Entity>

    update(id: number, object: Partial<Entity>): Promise<any>

    findAll(options: FindDto<Entity>): Promise<FindReturnDto<Entity>>
}