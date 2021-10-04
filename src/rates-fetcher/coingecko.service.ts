import { Injectable, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class CoinGeckoService {
  private readonly logger = new Logger(CoinGeckoService.name);

  constructor(private httpService: HttpService) {}

  async fetchRate(cur1: string, cur2: string): Promise<number> {
    const url = CoinGeckoService.makeRateUrlForCurrencies(cur1, cur2);

    this.logger.debug(`Request to "${url}"`);

    const { data } = await this.httpService.get(url).toPromise();

    this.logger.debug(`Response: ${JSON.stringify(data)}`);

    const {
      [cur1]: { [cur2]: rate },
    } = data;

    return rate;
  }

  private static makeRateUrlForCurrencies(cur1: string, cur2: string): string {
    return `https://api.coingecko.com/api/v3/simple/price?ids=${cur1}&vs_currencies=${cur2}`;
  }
}
