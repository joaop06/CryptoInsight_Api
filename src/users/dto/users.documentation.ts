import { CreateUserDto } from './create-user.dto';
import { FindOptionsDto } from '../../../dto/find.dto';
import { ChangePasswordDto } from './change-password.dto';

const User = {
  id: 1,
  name: 'João Borges',
  email: 'joao@test.com',
  createdAt: '2024-10-14T10:00:00Z',
  updatedAt: '2024-10-14T10:00:00Z',
  deletedAt: null,
};

export class DeleteDoc {
  static operation = { summary: 'Deletar registro de usuário' };

  static param = { name: 'id', required: true, description: 'ID do usuário' };

  static okResponse = {
    example: { message: 'Sucesso ao deletar', affected: 1 },
  };

  static badRequest = {
    example: { message: 'Erro ao deletar', error: 'string' },
  };
}

export class ChangePasswordDoc {
  static body = { required: true, type: ChangePasswordDto };

  static operation = { summary: 'Alterar de senha de usuário' };

  static okResponse = { example: { message: 'Sucesso ao atualizar senha' } };

  static badRequest = {
    example: { message: 'Erro ao atualizar senha', error: 'string' },
  };

  static notFound = {
    example: {
      message: 'Erro ao atualizar senha: Usuário não encontrado',
      error: 'string',
    },
  };
}

export class FindOneDoc {
  static okResponse = { example: User };

  static operation = { summary: 'Buscar usuário por ID' };

  static param = { name: 'id', required: true, description: 'ID do usuário' };

  static notFound = {
    example: { message: 'Usuário não encontrado', error: 'string' },
  };
}

export class CreateDoc {
  static createdResponse = { example: User };

  static operation = { summary: 'Inserir usuário' };

  static body = { required: true, type: CreateUserDto };

  static conflict = {
    example: { message: 'Erro ao inserir', error: 'string' },
  };

  static badRequest = {
    example: { message: 'Erro ao inserir', error: 'string' },
  };
}

export class UpdateDoc {
  static operation = { summary: 'Atualizar dados de usuário' };

  static param = { name: 'id', required: true, description: 'ID do usuário' };

  static okResponse = {
    example: { message: 'Sucesso ao atualizar', affected: 1 },
  };

  static badRequest = {
    example: { message: 'Erro ao atualizar', error: 'string' },
  };
}

export class FindAllDoc {
  static query = { type: FindOptionsDto };

  static operation = { summary: 'Buscar usuários' };

  static badRequest = {
    example: { message: 'Erro ao buscar usuários', error: 'string' },
  };

  static okResponse = {
    isArray: true,
    require: true,
    description: 'Lista de usuários encontrados',
    schema: {
      example: {
        count: 2,
        rows: [User, User],
      },
    },
  };
}
