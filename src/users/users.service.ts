import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private usersRepository: Repository<UserEntity>
    ) { }

    async findOne(id: number): Promise<UserEntity> {
        const result = await this.usersRepository.findOneBy({ id });

        return { ...result, password: undefined };
    }

    async create(object: UserEntity): Promise<UserEntity> {
        object = {
            ...object,
            password: await bcrypt.hash(object.password, 10)
        };

        const result = await this.usersRepository.save(object);
        return { ...result, password: undefined };
    }

    async update(id: number, object: Partial<UserEntity>): Promise<any> {
        delete object.password
        return await this.usersRepository.update(id, object);
    }

    async delete(id: number): Promise<any> {
        return await this.usersRepository.softDelete(id);
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.usersRepository.findOneBy({ email });
    }

    async changePassword(changePasswordDto: { userId: number; oldPassword: string; newPassword: string }): Promise<any> {
        const { userId } = changePasswordDto;
        const user = await this.findOne(userId);

        const passwordMatch = await bcrypt.compare(changePasswordDto.oldPassword, user.password);
        if (!passwordMatch) throw new Error('Invalid old password');

        const newHashedPassword = await bcrypt.hash(changePasswordDto.newPassword, 10);
        return await this.usersRepository.update(userId, { password: newHashedPassword });
    }
}
