import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RatePair } from '../../types/rate-pair';

@Injectable()
export class RatePairValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Object.values(RatePair).includes(value)) {
      throw new BadRequestException(`Pair "${value}" is invalid`);
    }

    return value;
  }
}
