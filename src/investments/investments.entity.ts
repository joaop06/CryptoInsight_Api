import {
    Entity,
    Column,
    OneToOne,
    JoinColumn,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from 'src/users/user.entity';

@Entity('investments')
export class InvestmentsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    value: number;

    @Column()
    symbol: string;

    // Define relacionamento OneToOne com User
    @OneToOne(() => UserEntity, (user) => user.investment, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'userId' }) // Define o nome da chave estrangeira
    user: UserEntity;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @DeleteDateColumn()
    deletedAt: Date;
}
