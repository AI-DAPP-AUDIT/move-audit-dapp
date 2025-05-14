import { currentConfig } from '../config';


export async function readBlob(blobId: string) {
    const response = await fetch(`${currentConfig.WALRUS_AGGREGATOR_URL}/v1/blobs/${blobId}`);
    const data = await response.blob();
    return data;
}