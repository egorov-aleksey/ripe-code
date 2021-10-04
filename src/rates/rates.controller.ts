import { Controller, Get, Param } from '@nestjs/common';

import { RatesService } from './rates.service';
import { RateSource } from '../types/rate-source';
import { RatePair } from '../types/rate-pair';
import { RateSourceValidationPipe } from './pipes/rate-source-validation.pipe';
import { RatePairValidationPipe } from './pipes/rate-pair-validation.pipe';

@Controller('rates')
export class RatesController {
  constructor(private ratesService: RatesService) {}

  @Get('/:source/:pair(*/*)')
  async getRates(
    @Param('source', RateSourceValidationPipe) source: RateSource,
    @Param('pair', RatePairValidationPipe) pair: RatePair,
  ): Promise<{ rate: number; rate24h: number }> {
    const { rate, changes } = await this.ratesService.getLastRateAndChanges(
      source,
      pair,
      24 * 60,
    );

    return {
      rate,
      rate24h: changes,
    };
  }
}
