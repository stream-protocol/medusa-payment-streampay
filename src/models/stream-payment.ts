import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryColumn,
    UpdateDateColumn,
} from "typeorm";

@Entity()
export class StreamPayment {
    @PrimaryColumn()
    id: string; // Unique identifier for the StreamPayment record

    @Column({ nullable: false })
    cart_id: string; // Identifier for the associated cart

    @Column({ nullable: false })
    total_amount: number; // Total payment amount

    @Column({ nullable: true })
    user_email: string; // User's email associated with the payment (nullable)

    @Column({ nullable: false })
    virtual_wallet_addr: string; // Virtual wallet address

    @Column({ nullable: false })
    virtual_wallet_pkey: string; // Virtual wallet private key

    @Column({ nullable: false })
    virtual_wallet_vkey: string; // Virtual wallet verification key

    @CreateDateColumn({ nullable: false })
    created_at: Date; // Date and time when the payment record was created

    @UpdateDateColumn({ nullable: false })
    updated_at: Date; // Date and time when the payment record was last updated

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date; // Date and time when the payment record was deleted (nullable)
}
