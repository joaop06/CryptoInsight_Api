import { FindOptionsDto } from "dto/find.dto";
import { CreateCryptoCurrencyDto } from "./create-crypto-currency.dto";

const Crypt = {

}

export class DeleteDoc {
    static operation = { summary: 'Deletar registro de criptomoeda' }

    static param = { name: 'id', required: true, description: 'ID da criptomoeda' }

    static okResponse = { example: { message: 'Sucesso ao deletar', affected: 1 } }

    static badRequest = { example: { message: 'Erro ao deletar', error: 'string' } }
}

export class FindOneDoc {
    static okResponse = { example: Crypt }

    static operation = { summary: 'Buscar criptomoeda por ID' }

    static param = { name: 'id', required: true, description: 'ID da criptomoeda' }

    static notFound = { example: { message: 'Criptomoeda não encontrado', error: 'string' } }
}

export class CreateDoc {
    static createdResponse = { example: Crypt }

    static operation = { summary: 'Inserir criptomoeda' }

    static body = { required: true, type: CreateCryptoCurrencyDto }

    static conflict = { example: { message: 'Erro ao inserir', error: 'string' } }

    static badRequest = { example: { message: 'Erro ao inserir', error: 'string' } }
}

export class UpdateDoc {
    static operation = { summary: 'Atualizar dados de criptomoeda' }

    static param = { name: 'id', required: true, description: 'ID da criptomoeda' }

    static okResponse = { example: { message: 'Sucesso ao atualizar', affected: 1 } }

    static badRequest = { example: { message: 'Erro ao atualizar', error: 'string' } }
}

export class FindAllDoc {
    static query = { type: FindOptionsDto }

    static operation = { summary: 'Buscar criptomoeda' }

    static badRequest = { example: { message: 'Erro ao buscar criptomoeda', error: 'string' } }

    static okResponse = {
        isArray: true,
        require: true,
        description: 'Lista de criptomoedas encontradas',
        schema: {
            example: {
                count: 2,
                rows: [Crypt, Crypt],
            }
        }
    }
}