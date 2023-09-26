import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models/user';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // You can add custom queries or methods for user management here if needed
}

class UserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    const newUser = new User();
    newUser.username = username;
    newUser.email = email;
    newUser.password = password;

    return await this.userRepository.save(newUser);
  }

  async getUserById(userId: number): Promise<User | undefined> {
    return await this.userRepository.findOne(userId);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return await this.userRepository.findOne({ where: { email } });
  }

  // You can add more user-related methods here, such as updating user details, deleting users, etc.
}

export default UserService;
