import { CryptoRiskService } from './crypto-risk.service';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { RiskClassificationDto } from './dto/risk-classification.dto';
import { RiskClassificationDoc } from './dto/crypto-risk.documentation';
import { CryptoCurrencyEntity } from '../crypto-currency/crypto-currency.entity';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('crypto-risk')
@Controller('crypto-risk')
export class CryptoRiskController {
  constructor(private readonly service: CryptoRiskService) { }

  @Post()
  @HttpCode(200)
  @ApiOperation(RiskClassificationDoc.operation)
  @ApiOkResponse(RiskClassificationDoc.okResponse)
  @ApiBadRequestResponse(RiskClassificationDoc.badRequest)
  async getRiskClassification(
    @Body() object: RiskClassificationDto,
  ): Promise<object> {
    const crypto = new CryptoCurrencyEntity(object);
    const risk = await this.service.getRiskClassification(crypto);

    return { risk };
  }
}
