import { currentConfig } from '../config';

interface Order {
    id: number;
    order_id: string;
    status: string;
    created_at: number;
}

interface CreateOrderResponse {
    message: string;
    order?: Order;
}

type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export async function CreateOrder(address: string): Promise<Result<Order, string>> {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
        "address": address
    });

    var requestOptions: RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow' as RequestRedirect
    };

    try {
        const response = await fetch(`${currentConfig.API_Url}/orders`, requestOptions);
        const data: CreateOrderResponse = await response.json();
        
        if (data.message === "OK" && data.order) {
            return { ok: true, data: data.order };
        }
        return { ok: false, error: data.message };
    } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : 'Create Order Failed' };
    }
}

