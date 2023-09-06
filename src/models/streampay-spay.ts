import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('streampay_spay_transactions')
export class StreamPaySPAY {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  spayAmount: number;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  usdcAmount: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'text' })
  trxId: string;

  // Add additional fields as needed
  // @Column({ type: 'text' })
  // additionalField: string;

  constructor(
    userId: string,
    spayAmount: number,
    usdcAmount: number,
    trxId: string
    // Add additional fields in the constructor as needed
    // additionalField: string
  ) {
    this.userId = userId;
    this.spayAmount = spayAmount;
    this.usdcAmount = usdcAmount;
    this.trxId = trxId;
    // Assign additional fields in the constructor as needed
    // this.additionalField = additionalField;
  }
}
