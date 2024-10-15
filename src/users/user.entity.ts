import {
    Entity,
    Column,
    OneToOne,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
// import moment from 'moment-timezone';
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

    // @BeforeInsert()
    // @BeforeUpdate()
    // protected adjustDates?(): void {
    //     const timezone = "America/Sao_Paulo";
    //     if (this.createdAt) {
    //         this.createdAt = moment(this.createdAt).tz(timezone).toDate();
    //     }
    //     if (this.updatedAt) {
    //         this.updatedAt = moment(this.updatedAt).tz(timezone).toDate();
    //     }
    // }
}