import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentsEntity } from './investments.entity';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';

@Module({
    exports: [InvestmentsService],
    providers: [InvestmentsService],
    controllers: [InvestmentsController],
    imports: [TypeOrmModule.forFeature([InvestmentsEntity])]
})
export class InvestmentsModule { }
