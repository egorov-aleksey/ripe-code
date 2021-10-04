import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { CoinGeckoService } from '../rates-fetcher/coingecko.service';
import { RatesService } from './rates.service';
import { RateSource } from '../types/rate-source';
import { RatePair } from '../types/rate-pair';

@Injectable()
export class JobsService {
  private readonly logger = new Logger(JobsService.name);

  constructor(
    private coinGeckoService: CoinGeckoService,
    private ratesService: RatesService,
  ) {}

  @Cron(CronExpression.EVERY_MINUTE)
  async fetchRateBtcUsd(): Promise<void> {
    const pair = RatePair.BTC_USD;

    this.logger.debug(`Fetch "${pair}" rate`);

    const rate = await this.coinGeckoService.fetchRate('bitcoin', 'usd');

    this.logger.debug(`Fetched "${pair}" rate: ${rate}`);

    await this.ratesService.storeRate(RateSource.COINGECKO, pair, rate);
  }
}
