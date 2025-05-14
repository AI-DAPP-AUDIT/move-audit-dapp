import { Box, Container, Card, Inset, Text, Flex } from "@radix-ui/themes";
import { useCurrentAccount, useConnectWallet, useWallets} from "@mysten/dapp-kit";
import Correct from "../components/correct";
import TransactionButton from "../components/transaction";
import { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from "../components/Header";
import Footer from "../components/Footer";

function Product() {
    const currentAccount = useCurrentAccount();
    const wallets = useWallets();
    const { mutate: connect } = useConnectWallet();
    const navigate = useNavigate();    

    useEffect(() => {
        if (!currentAccount && wallets.length > 0) {
            // Automatically connect to the first wallet
            connect({ wallet: wallets[0] });
        }
    }, [currentAccount, wallets, connect]);

	if (!currentAccount) {
        navigate("/")
	}

    return (
        <>
            <Header />
            <Container size="1" px="4" py="5">
                <Box maxWidth="480px" mx="auto">
                    <Card size="3">
                        <Inset clip="padding-box" side="top" pb="current">
                            <img
                                src="../../public/audit.png"
                                alt="Audit Service"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: 200,
                                    backgroundColor: "var(--gray-5)",
                                }}
                            />
                        </Inset>
                        
                        <Flex direction="column" gap="3" p="4">
                            <Text as="p" size="5" weight="bold" align="center" mt="2">
                                Single Audit Service
                            </Text>

                            <Text as="p" size="4" weight="medium" mb="2">
                                Service Includes:
                            </Text>

                            <Flex direction="column" gap="2">
                                <Flex align="center" gap="2">
                                    <Correct />
                                    <Text as="span" size="3">Security Vulnerability Detection</Text>
                                </Flex>
                                <Flex align="center" gap="2">
                                    <Correct />
                                    <Text as="span" size="3">Key Component Analysis and Quality Recommendations</Text>
                                </Flex>
                                <Flex align="center" gap="2">
                                    <Correct />
                                    <Text as="span" size="3">Risk Assessment and Priority Ranking</Text>
                                </Flex>
                                <Flex align="center" gap="2">
                                    <Correct />
                                    <Text as="span" size="3">Readable Audit Report</Text>
                                </Flex>
                                <Flex align="center" gap="2">
                                    <Correct />
                                    <Text as="span" size="3">Walrus Storage Audit Report</Text>
                                </Flex>
                            </Flex>

                            <Box mt="4">
                                <TransactionButton 
                                    amount={100000}
                                    currentAccount={currentAccount}
                                />
                            </Box>
                        </Flex>
                    </Card>
                </Box>
            </Container>

            <Footer />
        </>
    );
}

export default Product;