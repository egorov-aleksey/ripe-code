import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { CoinGeckoService } from './coingecko.service';

@Module({
  imports: [HttpModule],
  exports: [CoinGeckoService, HttpModule],
  providers: [CoinGeckoService],
})
export class RatesFetcherModule {}
