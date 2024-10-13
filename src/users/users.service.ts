import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { FindDto, FindReturnDto } from 'dto/find.dto';
import { UpdateUserDto } from './dto/update-user.dts';
import { ChangePasswordDto } from './dto/change-password.dto';
import { UsersServiceInterface } from './interfaces/user.service.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ) { }

    removePassword(user: UserEntity) {
        return { ...user, password: undefined };
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.repository.findOneBy({ email });
    }

    async delete(id: number): Promise<any> {
        return await this.repository.softDelete(id);
    }

    async findOne(id: number): Promise<UserEntity> {
        const user = await this.repository.findOneBy({ id });

        return this.removePassword(user);
    }

    async create(object: CreateUserDto): Promise<UserEntity> {
        const password = await bcrypt.hash(object.password, 10);
        const user = await this.repository.save({ ...object, password });

        return this.removePassword(user);
    }

    async update(id: number, object: UpdateUserDto): Promise<any> {
        return await this.repository.update(id, object);
    }

    async findAll(options: FindDto<UserEntity>): Promise<FindReturnDto<UserEntity>> {
        const [rows, count] = await this.repository.findAndCount(options)

        return { rows, count };
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
