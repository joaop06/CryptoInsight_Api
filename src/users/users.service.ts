import * as bcrypt from 'bcrypt';
import { UserEntity } from './user.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dts';
import { UserReturnDto } from './dto/user-return.dto';
import { QueryFailedError, Repository } from 'typeorm';
import { Exception } from 'interceptors/exception.filter';
import { ChangePasswordDto } from './dto/change-password.dto';
import { FindOptionsDto, FindReturnModelDto } from 'dto/find.dto';
import { UsersServiceInterface } from './interfaces/user.service.interface';

@Injectable()
export class UsersService implements UsersServiceInterface {
    constructor(
        @InjectRepository(UserEntity)
        private repository: Repository<UserEntity>
    ) { }

    removePassword(user: UserEntity) {
        delete user?.password;
        return user;
    }

    async findOneByEmail(email: string): Promise<UserEntity> {
        return await this.repository.findOneBy({ email });
    }

    async delete(id: number): Promise<any> {
        const result = await this.repository.softDelete(id);

        if (result.affected === 0) throw new Exception({ message: 'Usuário não encontrado' })

        return result;
    }

    async findOne(id: number): Promise<UserEntity> {
        /**
         * *********** Ainda retornando Password ao buscar ***********
         */
        const user = await this.repository.findOne({ where: { id } });

        if (user) return this.removePassword(user);
        else throw new Exception({ message: 'Usuário não encontrado', status: 404 });
    }

    async create(object: CreateUserDto): Promise<UserReturnDto> {
        try {
            /**
             * *********** Ainda retornando Password ao criar ***********
             */
            const password = await bcrypt.hash(object.password, 10);
            return await this.repository.save({ ...object, password });

        } catch (error) {
            if (error instanceof QueryFailedError && error.message.includes("Duplicate entry")) {
                // Personalizando a mensagem de erro para duplicidade de email
                throw new Exception({ message: 'Este email já está em uso', status: 409 });

            } else {
                throw error; // Lançar outros erros que possam ocorrer
            }
        }
    }

    async update(id: number, object: UpdateUserDto): Promise<any> {
        const result = await this.repository.update(id, object);

        if (result.affected === 0) throw new Exception({ message: 'Usuário não encontrado' })

        return result;
    }

    async findAll(options: FindOptionsDto<UserEntity>): Promise<FindReturnModelDto<UserEntity>> {
        /**
         * *********** Ainda retornando Password ao buscar ***********
         */
        const [rows, count] = await this.repository.findAndCount({
            ...options,
            select: ['id', 'name', 'email', 'investments', 'createdAt', 'updatedAt', 'deletedAt']

        })

        return { rows, count };
    }

    async changePassword(object: ChangePasswordDto): Promise<any> {
        const { userId } = object;
        const user = await this.repository.findOneBy({ id: userId });
        if (!user) throw new Exception({ message: 'Usuário não encontrado', status: 404 });


        const passwordMatch = await bcrypt.compare(object.oldPassword, user.password);
        if (!passwordMatch) throw new Error('Senha antiga inválida');

        const newHashedPassword = await bcrypt.hash(object.newPassword, 10);
        return await this.repository.update(userId, { password: newHashedPassword });
    }
}
