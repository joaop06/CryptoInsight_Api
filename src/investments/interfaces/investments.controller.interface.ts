import { FindDto, FindReturnDto } from "interfaces/dto/find.dto";
import { CreateInvestmentDto } from "../dto/create-investment.dto";
import { InvestmentsEntity as Entity } from "../investments.entity";
import { ControllerInterface } from "interfaces/ControllerInterface";

export interface InvestmentsControllerInterface extends ControllerInterface<
    Entity,
    CreateInvestmentDto
> { }