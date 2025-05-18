export const config = {
    PACKAGE_ID: import.meta.env.VITE_PACKAGE_ID,
    NETWORK: import.meta.env.VITE_NETWORK,
    API_Url:  import.meta.env.VITE_API_URL,
    WALRUS_AGGREGATOR_URL: import.meta.env.VITE_WALRUS_AGGREGATOR_URL,
} as const;

export const currentConfig = config


console.log('Current Environment:', import.meta.env.VITE_APP_ENV);
console.log('Using Config:', currentConfig);