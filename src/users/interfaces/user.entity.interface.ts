import { EntityInterface } from "interfaces/EntityInterface";
import { InvestmentsEntity } from "src/investments/investments.entity";

export interface UserEntityInterface extends EntityInterface {
    name: string;

    email: string;

    password: string;

    investment: InvestmentsEntity
}