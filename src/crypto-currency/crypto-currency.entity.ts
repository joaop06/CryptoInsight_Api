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

    @Column({ default: null })
    marketCap?: number;

    @Column({ default: null })
    circulatingSupply?: number;

    @OneToMany(() => InvestmentsEntity, (investment) => investment.crypto)
    investments: InvestmentsEntity[];

    @CreateDateColumn()
    createdAt: Date | string;

    @UpdateDateColumn()
    updatedAt: Date | string;

    @DeleteDateColumn()
    deletedAt: Date | string;
}