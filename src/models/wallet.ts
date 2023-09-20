import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Wallet {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'decimal', precision: 18, scale: 6 })
  balance: number;

  // Add other properties as needed
}
