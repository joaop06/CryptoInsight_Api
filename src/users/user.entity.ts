import {
    Entity,
    Column,
    OneToMany,
    BeforeInsert,
    BeforeUpdate,
    CreateDateColumn,
    DeleteDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn,
} from 'typeorm';
import moment from 'moment-timezone';
import { Moment } from 'moment-timezone';
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
    @OneToMany(() => InvestmentsEntity, (investment) => investment.user)
    investments: InvestmentsEntity[];

    @CreateDateColumn({ type: 'timestamp' })
    createdAt: Date | string | Moment;

    @UpdateDateColumn({ type: 'timestamp' })
    updatedAt: Date | string | Moment;

    @DeleteDateColumn({ type: 'timestamp' })
    deletedAt: Date | string | Moment;

    @BeforeInsert()
    @BeforeUpdate()
    protected adjustDates?(): void {
        const timezone = "America/Sao_Paulo";
        if (this.createdAt) {
            this.createdAt = moment(this.createdAt).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
        }
        if (this.updatedAt) {
            this.updatedAt = moment(this.updatedAt).tz(timezone).format('YYYY-MM-DD HH:mm:ss');
        }
    }
}