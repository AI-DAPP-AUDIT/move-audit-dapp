import { ConnectModal, useConnectWallet, useWallets } from '@mysten/dapp-kit';
import { useState } from 'react';
import { redirect } from "react-router";
 
export function Link() {
	const wallets = useWallets();
	const [open, setOpen] = useState(false);
	const { mutate: connect } = useConnectWallet();
 
	return (
		<ConnectModal
			trigger={
				<button onClick={() => {
					connect(
						{ wallet: wallets[0] },
						{
							onSuccess: () =>  {
								console.log("========= success")
								redirect("/product");	
							},
						},
					);
				}}> begin audit  </button>
			}
			open={open}
			onOpenChange={(isOpen) => setOpen(isOpen)}
		/>
	);
}

export default Link;