import { CreateInvestmentDto } from '../dto/create-investment.dto';
import { InvestmentsEntity as Entity } from '../investments.entity';
import { ServiceInterface } from '../../../interfaces/service.interface';

export interface InvestmentsServiceInterface
  extends ServiceInterface<Entity, CreateInvestmentDto> {}
