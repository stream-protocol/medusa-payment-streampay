import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('streampay_sol_transactions')
export class StreamPaySOL {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  solAmount: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'text' })
  transactionId: string;

  // Add additional fields as needed
  // @Column({ type: 'text' })
  // additionalField: string;

  constructor(
    userId: string,
    solAmount: number,
    transactionId: string
    // Add additional fields in the constructor as needed
    // additionalField: string
  ) {
    this.userId = userId;
    this.solAmount = solAmount;
    this.transactionId = transactionId;
    // Assign additional fields in the constructor as needed
    // this.additionalField = additionalField;
  }
}
