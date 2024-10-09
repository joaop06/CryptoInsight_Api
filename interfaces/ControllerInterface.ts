import { EntityInterface } from "./EntityInterface"

export interface ControllerInterface {
    findOne(id: string): Promise<EntityInterface>

    create(object: EntityInterface): Promise<EntityInterface>

    update(id: string, object: Partial<EntityInterface>): Promise<any>

    delete(id: string): Promise<any>
}