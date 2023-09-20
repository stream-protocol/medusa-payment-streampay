To create models and repositories for a Stream Payment Gateway, you can follow these steps:

1. **Create Models**:

    **models/stream-payment-gateway.ts**

    ```typescript
    import {
      Entity,
      PrimaryGeneratedColumn,
      Column,
      CreateDateColumn,
      UpdateDateColumn,
    } from 'typeorm';

    @Entity('stream_payment_gateway')
    export class StreamPaymentGateway {
      @PrimaryGeneratedColumn('uuid')
      id: string;

      @Column()
      name: string;

      @Column()
      publicKey: string;

      @CreateDateColumn()
      createdAt: Date;

      @UpdateDateColumn()
      updatedAt: Date;
    }
    ```

2. **Create Repositories**:

    **repositories/stream-payment-gateway.ts**

    ```typescript
    import { EntityRepository, Repository } from 'typeorm';
    import { StreamPaymentGateway } from '../models/stream-payment-gateway';

    @EntityRepository(StreamPaymentGateway)
    export class StreamPaymentGatewayRepository extends Repository<StreamPaymentGateway> {
      // Add custom repository methods if needed
    }
    ```

3. **Add Solana Blockchain Gateway**:

   To integrate a Solana blockchain gateway, you'll need to extend the `StreamPaymentGateway` model to include fields specific to Solana, such as Solana wallet addresses, public keys, and any other relevant information. Modify the `models/stream-payment-gateway.ts` file accordingly.

   For example, you can add fields like this:

   ```typescript
   @Entity('stream_payment_gateway')
   export class StreamPaymentGateway {
     // ... existing fields

     @Column()
     solanaWalletAddress: string;

     @Column()
     solanaPublicKey: string;

     // ... other Solana-related fields
   }
   ```

   Update the database schema accordingly by running migrations.

4. **Usage in Your Application**:

   You can now use the `StreamPaymentGatewayRepository` to perform database operations related to Solana payment gateways, such as creating, retrieving, updating, or deleting gateway records.

   Here's an example of how you might use it in your application:

   ```typescript
   import { getCustomRepository } from 'typeorm';
   import { StreamPaymentGatewayRepository } from '../repositories/stream-payment-gateway';

   // Create a new Solana payment gateway
   const gateway = new StreamPaymentGateway();
   gateway.name = 'Solana Gateway';
   gateway.publicKey = 'your-solana-public-key';
   gateway.solanaWalletAddress = 'your-solana-wallet-address';
   gateway.solanaPublicKey = 'your-solana-public-key';

   const gatewayRepository = getCustomRepository(StreamPaymentGatewayRepository);

   // Save the gateway to the database
   await gatewayRepository.save(gateway);

   // Retrieve a gateway by ID
   const retrievedGateway = await gatewayRepository.findOne(gateway.id);

   // Update the gateway
   retrievedGateway.name = 'Updated Stream Payment Gateway';
   await gatewayRepository.save(retrievedGateway);

   // Delete the gateway
   await gatewayRepository.delete(retrievedGateway.id);
   ```

   This code assumes that you have set up TypeORM and configured your database connection proper. Remember to adjust the model and repository code to fit StreamPay specific requirements for the Solana blockchain gateway. The provided code serves as a starting point, and you can expand it based on StreamPay Medusa Plugin's needs.
