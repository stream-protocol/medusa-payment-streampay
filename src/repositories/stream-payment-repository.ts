import { EntityRepository, Repository } from "typeorm";
import { StreamPaymentService } from "../models/stream-payment-service";

@EntityRepository(StreamPaymentService)
export class StreamPaymentRepository extends Repository<StreamPaymentRepository> {
  // Add any custom methods for querying the StreamPayment table here
}
