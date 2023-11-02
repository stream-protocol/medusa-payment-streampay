import { createContainer, asClass } from 'awilix';
import StreamPaymentService from './stream-payment-service';

const container = createContainer();

container.register({
  streamPaymentService: asClass(StreamPaymentService).scoped(),
});

export default container;
