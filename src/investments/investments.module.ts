import { Module } from '@nestjs/common';
import { InvestmentsService } from './investments.service';
import { InvestmentsController } from './investments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvestmentsEntity } from './investments.entity';

@Module({
    exports: [InvestmentsService],
    providers: [InvestmentsService],
    controllers: [InvestmentsController],
    imports: [TypeOrmModule.forFeature([InvestmentsEntity])]
})
export class InvestmentsModule { }
