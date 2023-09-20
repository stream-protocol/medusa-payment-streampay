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

  // Additional fields can be added here
  @Column({ type: 'text', nullable: true })
  additionalField: string | null;

  constructor(
    userId: string,
    spayAmount: number,
    usdcAmount: number,
    trxId: string,
    additionalField: string | null = null
  ) {
    this.userId = userId;
    this.spayAmount = spayAmount;
    this.usdcAmount = usdcAmount;
    this.trxId = trxId;
    this.additionalField = additionalField;
  }
}
