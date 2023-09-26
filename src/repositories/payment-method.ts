import { EntityRepository, Repository } from 'typeorm';
import { PaymentMethod } from '../models/payment-method';

@EntityRepository(PaymentMethod)
export class PaymentMethodRepository extends Repository<PaymentMethod> {
  // You can add custom queries or methods for payment methods here if needed
}
