import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('streampay_strm_transactions')
export class StreamPaySTRM {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  strmAmount: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'text' })
  transactionId: string;

  // Add additional fields as needed
  // @Column({ type: 'text' })
  // additionalField: string;

  constructor(
    userId: string,
    strmAmount: number,
    transactionId: string
    // Add additional fields in the constructor as needed
    // additionalField: string
  ) {
    this.userId = userId;
    this.strmAmount = strmAmount;
    this.transactionId = transactionId;
    // Assign additional fields in the constructor as needed
    // this.additionalField = additionalField;
  }
}
