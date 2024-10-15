import { FindDto } from "dto/find.dto";
import { CreateUserDto } from "./create-user.dto";
import { ChangePasswordDto } from "./change-password.dto";

export class UsersDocs {

    private static userExample = {
        id: 1,
        name: 'João Borges',
        email: 'joao@test.com',
        createdAt: '2024-10-14T10:00:00Z',
        updatedAt: '2024-10-14T10:00:00Z',
        deletedAt: null
    }

    static delete = {
        operation: { summary: 'Deletar registro de usuário' },
        badRequest: { example: { message: 'Erro ao deletar' } },
        okResponse: { example: { message: 'Sucesso ao deletar' } },
        param: { name: 'id', required: true, description: 'ID do usuário' },
    }

    static changePassword = {
        body: { required: true, type: ChangePasswordDto },
        operation: { summary: 'Alterar de senha de usuário' },
        badRequest: { example: { message: 'Erro ao atualizar senha' } },
        okResponse: { example: { message: 'Sucesso ao atualizar senha' } },
    }

    static findOne = {
        okResponse: { example: this.userExample },
        operation: { summary: 'Buscar usuário por ID' },
        notFound: { example: { message: 'Usuário não encontrado' } },
        param: { name: 'id', required: true, description: 'ID do usuário' },
    }

    static create = {
        operation: { summary: 'Inserir usuário' },
        body: { required: true, type: CreateUserDto },
        createdResponse: { example: this.userExample },
        badRequest: { example: { statusCode: 400, error: 'string', message: 'Erro ao inserir' } },
    }

    static update = {
        operation: { summary: 'Atualizar dados de usuário' },
        badRequest: { example: { message: 'Erro ao atualizar' } },
        okResponse: { example: { message: 'Sucesso ao atualizar' } },
        param: { name: 'id', required: true, description: 'ID do usuário' },
    }

    static findAll = {
        query: { type: FindDto },
        operation: { summary: 'Buscar usuários' },
        okResponse: {
            isArray: true,
            require: true,
            description: 'Lista de usuários encontrados',
            schema: {
                example: {
                    count: 2,
                    rows: [this.userExample, this.userExample],
                }
            }
        },
        badRequest: { example: { message: 'Erro ao buscar usuários' } },
    }
}