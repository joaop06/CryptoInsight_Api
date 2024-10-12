import { FindDto, FindReturnDto } from "./dto/find.dto";

export interface ControllerInterface<Entity, CreateDto> {
    delete(id: string): Promise<any>

    findOne(id: string): Promise<Entity>

    create(object: CreateDto): Promise<Entity>

    update(id: string, object: Partial<Entity>): Promise<any>

    findAll(options: FindDto<Entity>): Promise<FindReturnDto<Entity>>
}