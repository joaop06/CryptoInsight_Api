import { CreateInvestmentDto } from "../dto/create-investment.dto";
import { InvestmentsEntity as Entity } from "../investments.entity";
import { ControllerInterface } from "interfaces/controller.interface";

export interface InvestmentsControllerInterface extends ControllerInterface<
    Entity,
    CreateInvestmentDto
> { }