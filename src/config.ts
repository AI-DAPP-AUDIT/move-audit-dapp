export const config = {
    testnet: {
        PACKAGE_ID: "0x01122779d9e84092859fb998fa020a905e666dc273c42f0ba9766ec2eb7f1e3b",
        NETWORK: "testnet",
        API_Url: "http://127.0.0.1:5000/api",
        SUI_RPC_URL: "https://fullnode.testnet.sui.io:443",
    },
    mainnet: {
        PACKAGE_ID: "0x01122779d9e84092859fb998fa020a905e666dc273c42f0ba9766ec2eb7f1e3b",
        NETWORK: "testnet",
        API_Url: "http://127.0.0.1:5000/api",
        SUI_RPC_URL: "https://fullnode.testnet.sui.io:443",
    }
} as const;

export const currentConfig = config.testnet;