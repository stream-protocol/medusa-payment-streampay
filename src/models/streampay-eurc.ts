import { EntityRepository, Repository } from 'typeorm';
import { StreamPayEURC } from './streampay-eurc';

@EntityRepository(StreamPayEURC)
export class StreamPayEURCRepository extends Repository<StreamPayEURC> {
  // Add custom repository methods if needed
}
