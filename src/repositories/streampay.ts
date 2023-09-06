import { StreamPay } from "../models/streampay";
import { EntityRepository, FindManyOptions, Repository } from "typeorm";
import { flatten, groupBy, map, merge } from "lodash";

@EntityRepository(StreamPay)
export class StreamPayRepository extends Repository<StreamPay> {
    public async findByCartId(cartId: string): Promise<StreamPay> {
        return await this.findOne({
            where: {
                cart_id: cartId,
            },
        }
        );
    }
}