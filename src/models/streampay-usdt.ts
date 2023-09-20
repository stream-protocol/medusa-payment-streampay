import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('streampay_usdt_transactions')
export class StreamPayUSDT {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  usdtAmount: number;

  @CreateDateColumn()
  timestamp: Date;

  @Column({ type: 'text' })
  trxId: string;

  // Additional fields can be added here
  @Column({ type: 'text', nullable: true })
  additionalField: string | null;

  constructor(
    userId: string,
    usdtAmount: number,
    trxId: string,
    additionalField: string | null = null
  ) {
    this.userId = userId;
    this.usdtAmount = usdtAmount;
    this.trxId = trxId;
    this.additionalField = additionalField;
  }
}
