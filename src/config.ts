export const config = {
    testnet: {
        PACKAGE_ID: "0x01122779d9e84092859fb998fa020a905e666dc273c42f0ba9766ec2eb7f1e3b",
        NETWORK: "testnet",
        API_Url: "http://127.0.0.1:5000/api",
        WALRUS_AGGREGATOR_URL: "https://aggregator.walrus-testnet.walrus.space",
    },
    mainnet: {
        PACKAGE_ID: "0x01122779d9e84092859fb998fa020a905e666dc273c42f0ba9766ec2eb7f1e3b",
        NETWORK: "testnet",
        API_Url: "http://127.0.0.1:5000/api",
        WALRUS_AGGREGATOR_URL: "https://aggregator.walrus-testnet.walrus.space",
    }
} as const;

export const currentConfig = import.meta.env.VITE_APP_ENV === 'production'
    ? config.mainnet 
    : config.testnet;


console.log('Current Environment:', import.meta.env.VITE_APP_ENV);
console.log('Using Config:', currentConfig);