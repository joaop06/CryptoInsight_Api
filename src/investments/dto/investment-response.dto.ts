export class InvestmentResponseDto {
    id: number;
    value: number;
    symbol: string;
    userId: number;
    createdAt: Date;
    updatedAt: Date;
    deletedAt?: Date;
}