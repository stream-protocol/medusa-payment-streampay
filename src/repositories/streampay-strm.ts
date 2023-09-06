import { EntityRepository, Repository } from 'typeorm';
import { StreamPaySTRM } from '../models/streampay-strm';

@EntityRepository(StreamPaySTRM)
export class StreamPaySTRMRepository extends Repository<StreamPaySTRM> {
  // Add custom repository methods if needed
}
