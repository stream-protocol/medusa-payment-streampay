import { EntityRepository, Repository } from 'typeorm';
import { StreamPayUSDT } from '../models/streampay-usdt';

@EntityRepository(StreamPayUSDT)
export class StreamPayUSDTRepository extends Repository<StreamPayUSDT> {
  // Add custom repository methods if needed
}
