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
    symbol: string;

    @Column()
    price: number;

    @Column()
    marketCap: number;

    @Column()
    circulatingSupply: number;

    @OneToMany(() => InvestmentsEntity, (investment) => investment.crypto)
    investments: InvestmentsEntity[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}