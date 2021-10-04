import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brackets, Repository } from 'typeorm';
import { Rate } from './rate.entity';
import { RateSource } from '../types/rate-source';
import { getChangesInPercent } from '../helpers/numeric.helper';
import { RatePair } from '../types/rate-pair';

@Injectable()
export class RatesService {
  constructor(
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
  ) {}

  async storeRate(source: RateSource, pair: RatePair, value: number): Promise<Rate> {
    const rate = new Rate();
    rate.source = source;
    rate.pair = pair;
    rate.value = value;

    return this.rateRepository.save(rate);
  }

  async getLastRateAndChanges(
    source: RateSource,
    pair: string,
    intervalInMinutes: number,
  ): Promise<{ rate: number; changes: number }> {
    const [currentRate, olderRate]: Rate[] = await this.rateRepository
      .createQueryBuilder('rate')
      .select('rate.value')
      .where('source = :source', { source })
      .andWhere('pair = :pair', { pair })
      .andWhere(
        new Brackets((qb) => {
          qb
            .where(`date_trunc('minute', created_at) = date_trunc('minute', now() - INTERVAL '1 minute')`)
            .orWhere(`date_trunc('minute', created_at) = date_trunc('minute', now() - INTERVAL '${intervalInMinutes + 1} minute')`);
        }),
      )
      .orderBy('created_at', 'DESC')
      .getMany();

    const { value: currentValue } = currentRate;

    if (!olderRate) {
      return {
        rate: currentValue,
        changes: null,
      };
    }

    const { value: olderValue } = olderRate;

    return {
      rate: currentValue,
      changes: getChangesInPercent(currentValue, olderValue),
    };
  }
}
