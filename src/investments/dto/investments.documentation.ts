import { FindOptionsDto } from "dto/find.dto";
import { CreateInvestmentDto } from "./create-investment.dto";

const Investment = {
    id: 1,
    userId: 38,
    value: 2010,
    cryptoId: 1,
    symbol: "BTC",
    createdAt: "2024-10-18T04:04:04.570Z",
    updatedAt: "2024-10-18T04:04:04.570Z",
    deletedAt: null
}

export class DeleteDoc {
    static operation = { summary: 'Deletar registro de investimento' }

    static okResponse = { example: { message: 'Sucesso ao deletar', affected: 1 } }

    static param = { name: 'id', required: true, description: 'ID do investimento' }

    static badRequest = { example: { message: 'Erro ao deletar', error: 'string' } }
}

export class FindOneDoc {
    static okResponse = { example: Investment }

    static operation = { summary: 'Buscar investimento por ID' }

    static param = { name: 'id', required: true, description: 'ID do investimento' }

    static notFound = { example: { message: 'Investimento não encontrado', error: 'string' } }
}

export class CreateDoc {
    static createdResponse = { example: Investment }

    static operation = { summary: 'Inserir investimento' }

    static body = { required: true, type: CreateInvestmentDto }

    static conflict = { example: { message: 'Erro ao inserir', error: 'string' } }

    static badRequest = { example: { message: 'Erro ao inserir', error: 'string' } }
}

export class UpdateDoc {
    static operation = { summary: 'Atualizar dados de investimento' }

    static param = { name: 'id', required: true, description: 'ID do investimento' }

    static okResponse = { example: { message: 'Sucesso ao atualizar', affected: 1 } }

    static badRequest = { example: { message: 'Erro ao atualizar', error: 'string' } }
}

export class FindAllDoc {
    static query = { type: FindOptionsDto }

    static operation = { summary: 'Buscar investimentos' }

    static badRequest = { example: { message: 'Erro ao buscar investimentos', error: 'string' } }

    static okResponse = {
        isArray: true,
        require: true,
        description: 'Lista de investimentos encontrados',
        schema: {
            example: {
                count: 2,
                rows: [Investment, Investment],
            }
        }
    }
}