import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from "typeorm";

@Entity()
export class StreamPayment {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  cart_id: string;

  @Column()
  amount: number;

  @Column()
  total_amount: number;

  @Column()
  user_email: string;

  @Column()
  virtual_wallet_addr: string;

  @Column()
  virtual_wallet_pkey: string;

  @Column()
  virtual_wallet_vkey: string;

  @Column({ default: 0 })
  refunded_amount: number;

  @Column({ default: "pending" })
  status: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
