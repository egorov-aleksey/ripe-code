import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JobsService } from './jobs.service';
import { RatesService } from './rates.service';
import { RatesController } from './rates.controller';
import { RatesFetcherModule } from '../rates-fetcher/rates-fetcher.module';
import { Rate } from './rate.entity';

@Module({
  imports: [RatesFetcherModule, TypeOrmModule.forFeature([Rate])],
  providers: [JobsService, RatesService],
  controllers: [RatesController],
})
export class RatesModule {}
