import { EntityRepository, Repository } from 'typeorm';
import { StreamPaySPAY } from '../models/streampay-spay';

@EntityRepository(StreamPaySPAY)
export class StreamPaySPAYRepository extends Repository<StreamPaySPAY> {
  // Add custom repository methods if needed
}
