import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    JoinColumn,
  } from "typeorm";
  import { Cart } from "@medusajs/medusa";
  
  @Entity()
  export class StreamPay {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    cart_id: string;
  
    @Column({ type: "decimal", precision: 10, scale: 2 })
    total_amount: number;
  
    @Column()
    user_email: string;
  
    @Column()
    virtual_wallet_addr: string;
  
    @Column()
    virtual_wallet_pkey: string;
  
    @Column()
    virtual_wallet_vkey: string;
  
    // Define a relationship with the Cart entity
    @ManyToOne(() => Cart)
    @JoinColumn({ name: "cart_id", referencedColumnName: "id" })
    cart: Cart;
  }
  