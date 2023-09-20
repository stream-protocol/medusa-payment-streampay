// Import necessary dependencies and types
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('transactions') // Replace 'transactions' with your actual table name
export class Transaction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  amount: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'text' })
  description: string;

  // Add additional fields as needed
  // @Column({ type: 'text' })
  // additionalField: string;

  constructor(
    userId: string,
    amount: number,
    description: string
    // Add additional fields in the constructor as needed
    // additionalField: string
  ) {
    this.userId = userId;
    this.amount = amount;
    this.description = description;
    // Assign additional fields in the constructor as needed
    // this.additionalField = additionalField;
  }
}
