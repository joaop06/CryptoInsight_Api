import { EntityInterface } from './EntityInterface';

export interface ServiceInterface {
    findOne(id: number): Promise<EntityInterface>

    create(object: EntityInterface): Promise<EntityInterface>

    update(id: number, object: Partial<EntityInterface>): Promise<any>

    delete(id: number): Promise<any>
}