import {
    Entity,
    Column,
    ManyToOne,
    JoinColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';
import { CryptoCurrencyEntity } from 'src/crypto-currency/crypto-currency.entity';

@Entity('investments')
export class InvestmentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    symbol: string;

    @Column()
    userId: number;

    @ManyToOne(() => CryptoCurrencyEntity, (cryptoCurrency) => cryptoCurrency.investments)
    @JoinColumn({ name: 'cryptoId' })
    crypto: CryptoCurrencyEntity

    // Define relacionamento ManyToOne com User
    @ManyToOne(() => UserEntity, (user) => user.investments, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' }) // Define o nome da chave estrangeira
    user: UserEntity;

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date;
}
