import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersServiceInterface } from './interfaces/user.service.interface';

import {
    FindAllUserDto,
    ChangePasswordDto,
    CreateUserReturnDto,
    UpdateUserReturnDto,
    FindAllUserReturnDto,
    FindOneUserReturnDto,
} from './interfaces/user.dto.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ) { }

    #removePassword(user) {
        return { result: { ...user, password: undefined } };
    }

    async findOne(id: number): Promise<FindOneUserReturnDto> {
        const user = await this.repository.findOneBy({ id });

        return this.#removePassword(user);
    }

    async findAll(options: FindAllUserDto): Promise<FindAllUserReturnDto> {
        const [rows, count] = await this.repository.findAndCount(options)

        return { rows, count };
    }

    async create(object: UserEntity): Promise<CreateUserReturnDto> {
        const password = await bcrypt.hash(object.password, 10);
        const user = await this.repository.save({ ...object, password });

        return this.#removePassword(user);
    }

    async update(id: number, object: Partial<UserEntity>): Promise<UpdateUserReturnDto> {
        delete object.password
        const user = await this.repository.update(id, object);

        return this.#removePassword(user);
    }

    async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.repository.findOneBy({ email });
    }

    async changePassword(object: ChangePasswordDto): Promise<any> {
        const { userId } = object;
        const user = await this.repository.findOneBy({ id: userId });

        const passwordMatch = await bcrypt.compare(object.oldPassword, user.password);
        if (!passwordMatch) throw new Error('Invalid old password');

        const newHashedPassword = await bcrypt.hash(object.newPassword, 10);
        return await this.repository.update(userId, { password: newHashedPassword });
    }
}
