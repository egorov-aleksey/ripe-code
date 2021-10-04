import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { RateSource } from '../types/rate-source';
import { RatePair } from '../types/rate-pair';

@Entity()
export class Rate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 50,
    nullable: false,
  })
  source: RateSource;

  @Column({
    type: 'varchar',
    length: 10,
    nullable: false,
  })
  pair: RatePair;

  @Column({
    type: 'float',
    nullable: false,
  })
  value: number;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    name: 'created_at',
  })
  createdAt: Date;
}
