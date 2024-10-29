import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    OneToMany,
} from 'typeorm';
import { InvestmentsEntity } from 'src/investments/investments.entity';

@Entity('crypto_currency')
export class CryptoCurrencyEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    date: Date;

    @Column('float')
    open: number;

    @Column('float')
    high: number;

    @Column('float')
    low: number;

    @Column('float')
    close: number;

    @Column('bigint')
    volume: number;

    @Column()
    currency: string;

    @Column()
    risk: string;

    @OneToMany(() => InvestmentsEntity, (investment) => investment.crypto)
    investments: InvestmentsEntity[];

    @CreateDateColumn()
    createdAt: Date | string;

    @UpdateDateColumn()
    updatedAt: Date | string;

    @DeleteDateColumn()
    deletedAt: Date | string;
}