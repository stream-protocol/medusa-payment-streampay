import { EntityRepository, Repository } from "typeorm";
import { User } from "../models/user";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // You can add custom repository methods here if needed.
}
