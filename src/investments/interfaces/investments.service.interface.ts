import { ServiceInterface } from "interfaces/ServiceInterface";
import { CreateInvestmentDto } from "../dto/create-investment.dto";
import { InvestmentsEntity as Entity } from "../investments.entity";

export interface InvestmentsServiceInterface extends ServiceInterface<
    Entity,
    CreateInvestmentDto
> { }