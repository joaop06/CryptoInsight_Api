import { Controller } from '@nestjs/common';
import { InvestmentsEntity } from './investments.entity';
import { ControllerInterface } from 'interfaces/ControllerInterface';
import { CreateReturnDto } from 'interfaces/dto/create.dto';
import { DeleteDto } from 'interfaces/dto/delete.dto';
import { FindOneDto, FindOneReturnDto, FindAllDto, FindAllReturnDto } from 'interfaces/dto/find.dto';
import { UpdateReturnDto } from 'interfaces/dto/update.dto';
import { InvestmentsService } from './investments.service';

@Controller('investments')
export class InvestmentsController implements ControllerInterface<InvestmentsEntity> {
    constructor(
        private readonly service: InvestmentsService
    ) { }


    delete(id: string): Promise<any> {
        return this.service.delete(+id);
    }

    create(object: InvestmentsEntity): Promise<CreateReturnDto<InvestmentsEntity>> {
        throw new Error('Method not implemented.');
    }

    findOne(id: FindOneDto): Promise<FindOneReturnDto<InvestmentsEntity>> {
        throw new Error('Method not implemented.');
    }

    findAll(options: FindAllDto<InvestmentsEntity>): Promise<FindAllReturnDto<InvestmentsEntity>> {
        throw new Error('Method not implemented.');
    }

    update(id: string, object: Partial<InvestmentsEntity>): Promise<UpdateReturnDto<InvestmentsEntity>> {
        throw new Error('Method not implemented.');
    }
}
