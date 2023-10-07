use solana_program::{
    account_info::{next_account_info, AccountInfo},
    entrypoint,
    entrypoint::ProgramResult,
    msg,
    program_error::ProgramError,
    pubkey::Pubkey,
    program_pack::Pack,
    instruction::{AccountMeta, Instruction},
};
use spl_token::{
    state::{Account as TokenAccount, Mint},
    instruction as token_instruction,
};

const FEE_PERCENTAGE: f64 = 0.01; // 1% fee

// ... (other code remains unchanged)

fn transfer_spl_tokens(
    payer: &Pubkey,
    recipient: &Pubkey,
    amount: u64,
    token_program_id: &Pubkey,
    payer_token_account: &Pubkey,
    recipient_token_account: &Pubkey,
) -> Result<Instruction, ProgramError> {
    let transfer_instruction = token_instruction::transfer(
        &token_program_id,
        &payer_token_account,
        &recipient_token_account,
        &payer,
        &[],
        amount,
    )?;
    Ok(transfer_instruction)
}

entrypoint!(process_instruction);
fn process_instruction(
    program_id: &Pubkey,
    accounts: &[AccountInfo],
    instruction_data: &[u8],
) -> ProgramResult {
    // ... (previous code)

    match instruction_data[0] {
        // ... (other cases)

        2 => {
            // Capture payment
            let mut payment = Payment::unpack(&payment_account.data.borrow())?;
            if payment.state != PaymentState::Authorized {
                return Err(ProgramError::InvalidInstructionData);
            }
            payment.state = PaymentState::Captured;

            // Deduct the fee and transfer it to the fee account
            let fee_account = next_account_info(accounts_iter)?;
            let token_program = next_account_info(accounts_iter)?;
            if *fee_account.key != payment.fee_account {
                return Err(ProgramError::InvalidAccountData);
            }

            // Transfer the fee to the fee account
            let fee_transfer_instruction = transfer_spl_tokens(
                &payment.payer,
                &payment.fee_account,
                payment.fee,
                &token_program.key,
                &payment_account.key,
                &fee_account.key,
            )?;
            solana_program::program::invoke(&fee_transfer_instruction, accounts)?;

            // Transfer the remaining amount to the merchant wallet
            let merchant_transfer_instruction = transfer_spl_tokens(
                &payment.payer,
                &payment.recipient,
                payment.amount - payment.fee,
                &token_program.key,
                &payment_account.key,
                &payment.recipient,
            )?;
            solana_program::program::invoke(&merchant_transfer_instruction, accounts)?;

            Payment::pack(payment, &mut payment_account.data.borrow_mut())?;
            msg!("Payment captured with fee transferred");
        }

        // ... (other cases)
    }

    Ok(())
}
