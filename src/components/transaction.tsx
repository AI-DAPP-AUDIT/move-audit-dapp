import { Transaction } from '@mysten/sui/transactions';
import {
	useSignTransaction,
	useSuiClient,
} from '@mysten/dapp-kit';
import { Button } from '@radix-ui/themes';
import { currentConfig } from '../config';
import { CreateOrder } from '../api/order';
import { useNavigate } from "react-router-dom";

interface TransactionButtonProps {
	amount: number;
}
 
function TransactionButton({ amount }: TransactionButtonProps) {
	const { mutateAsync: signTransaction } = useSignTransaction();
	const client = useSuiClient();
	const navigate = useNavigate();
	// const currentAccount = useCurrentAccount();

	// // if (!currentAccount) {
	// // 	return null;
	// // }

	return (
		<Button 
			size="3"
			variant="solid"
			color="blue"
			style={{ width: '100%' }}
			onClick={async () => {				
                const result = await CreateOrder();
                if (!result.ok) {
                    console.error(result.error);
					return
                }
				
				const tx = new Transaction();
				const orderIdBytes = tx.pure.string(result.data.order_id);
				const [paymentCoin] = tx.splitCoins(tx.gas, [amount])

				tx.moveCall({
					target: `${currentConfig.PACKAGE_ID}::payment::pay`,
					arguments: [orderIdBytes, paymentCoin],
				})

				console.log("done this 1 ======\n")

                try {
					const { bytes, signature } = await signTransaction({
						transaction: tx,
					});
	
					console.log("done this 2 ======\n")
	 
					const executeResult = await client.executeTransactionBlock({
						transactionBlock: bytes,
						signature,
						options: {
							showRawEffects: true,
						},
					});
					console.log("done this 3 ======\n")
 
					console.log('Transaction executed:', executeResult);

					await client.waitForTransaction({ digest: executeResult.digest });
					console.log("done this 4 ======\n")
					navigate(`/upload?order_id=${result.data.order_id}&digest=${executeResult.digest}`)
				} catch (error) {
					console.error(error);
				}
			}}
		>
			Start Audit
		</Button>
	);
}
 
export default TransactionButton;