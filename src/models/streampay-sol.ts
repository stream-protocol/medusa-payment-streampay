import { EntityRepository, Repository } from 'typeorm';
import { StreamPaySOL } from './streampay-sol';

@EntityRepository(StreamPaySOL)
export class StreamPaySOLRepository extends Repository<StreamPaySOL> {
  // Add custom repository methods if needed
}
