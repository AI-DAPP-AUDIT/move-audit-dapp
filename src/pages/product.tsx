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
                    <Card size="3" style={{ 
                        overflow: 'hidden',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        borderRadius: '16px'
                    }}>
                        <Inset clip="padding-box" side="top" pb="current">
                            <img
                                src="/audit.png"
                                alt="Audit Service"
                                style={{
                                    display: "block",
                                    objectFit: "cover",
                                    width: "100%",
                                    height: 240,
                                    backgroundColor: "var(--gray-5)",
                                    transition: "transform 0.3s ease",
                                }}
                            />
                        </Inset>
                        
                        <Flex direction="column" gap="3" p="5">
                            <Text as="p" size="6" weight="bold" align="center" style={{
                                color: 'var(--slate-12)',
                                marginBottom: '16px'
                            }}>
                                Single Audit Service
                            </Text>

                            <Flex direction="column" gap="3" style={{
                                background: 'var(--slate-2)',
                                padding: '16px',
                                borderRadius: '12px'
                            }}>
                                <Text as="p" size="3" weight="medium" style={{
                                    color: 'var(--slate-11)',
                                    marginBottom: '8px'
                                }}>
                                    Service Includes:
                                </Text>

                                <Flex direction="column" gap="3">
                                    <Flex align="center" gap="2">
                                        <Correct />
                                        <Text as="span" size="3" style={{ lineHeight: '1.5' }}>Security Vulnerability Detection</Text>
                                    </Flex>
                                    <Flex align="center" gap="2">
                                        <Correct />
                                        <Text as="span" size="3" style={{ lineHeight: '1.5' }}>Key Component Analysis and Quality Recommendations</Text>
                                    </Flex>
                                    <Flex align="center" gap="2">
                                        <Correct />
                                        <Text as="span" size="3" style={{ lineHeight: '1.5' }}>Risk Assessment and Priority Ranking</Text>
                                    </Flex>
                                    <Flex align="center" gap="2">
                                        <Correct />
                                        <Text as="span" size="3" style={{ lineHeight: '1.5' }}>Readable Audit Report</Text>
                                    </Flex>
                                    <Flex align="center" gap="2">
                                        <Correct />
                                        <Text as="span" size="3" style={{ lineHeight: '1.5' }}>Walrus Storage Audit Report</Text>
                                    </Flex>
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