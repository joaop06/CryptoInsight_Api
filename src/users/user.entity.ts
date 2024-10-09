import {
    Entity,
    Column,
    OneToOne,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { InvestmentsEntity } from 'src/investments/investments.entity';

@Entity('users')
export class UserEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    // Define relacionamento OneToOne com Investments
    @OneToOne(() => InvestmentsEntity, (investment) => investment.user)
    investment: InvestmentsEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}