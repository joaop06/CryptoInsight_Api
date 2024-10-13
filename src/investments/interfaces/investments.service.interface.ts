import { ServiceInterface } from "interfaces/service.interface";
import { CreateInvestmentDto } from "../dto/create-investment.dto";
import { InvestmentsEntity as Entity } from "../investments.entity";

export interface InvestmentsServiceInterface extends ServiceInterface<
    Entity,
    CreateInvestmentDto
> { }