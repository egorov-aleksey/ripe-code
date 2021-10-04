import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { RateSource } from '../../types/rate-source';

@Injectable()
export class RateSourceValidationPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (!Object.values(RateSource).includes(value)) {
      throw new BadRequestException(`Source "${value}" is invalid`);
    }

    return value;
  }
}
