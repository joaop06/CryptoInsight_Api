export class RiskClassificationDoc {
    static okResponse = { example: { risk: 'Alto' } }

    static operation = { summary: 'Classificar o risco de um ativo' }

    static badRequest = { example: { message: 'Erro ao classificar o risco do ativo', error: 'string' } }
}