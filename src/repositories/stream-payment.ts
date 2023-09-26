import { StreamPayment } from "../models/stream-payment";
import { EntityRepository, Repository } from "typeorm";

@EntityRepository(StreamPayment)
export class StreamPaymentRepository extends Repository<StreamPayment> {
    // Custom method to find a StreamPayment by cart_id
    public async findByCartId(cartId: string): Promise<StreamPayment | undefined> {
        return await this.findOne({
            where: {
                cart_id: cartId,
            },
        });
    }
}
