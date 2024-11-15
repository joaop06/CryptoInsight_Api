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
import { UserEntity } from '../users/user.entity';
import { CryptoCurrencyEntity } from '../crypto-currency/crypto-currency.entity';

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

  @Column()
  cryptoId: number;

  @ManyToOne(
    () => CryptoCurrencyEntity,
    (cryptoCurrency) => cryptoCurrency.investments,
  )
  @JoinColumn({ name: 'cryptoId' })
  crypto: CryptoCurrencyEntity;

  // Define relacionamento ManyToOne com User
  @ManyToOne(() => UserEntity, (user) => user.investments, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'userId' }) // Define o nome da chave estrangeira
  user: UserEntity;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date | string;

  @UpdateDateColumn({ type: 'timestamp' })
  updatedAt: Date | string;

  @DeleteDateColumn({ type: 'timestamp' })
  deletedAt: Date | string;
}
