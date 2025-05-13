import { currentConfig } from '../config';

interface AuditResponse {
    message: string;
}

type Result<T, E> = { ok: true; data: T } | { ok: false; error: E };

export async function BeginAudit(orderId: string, digest: string, files: File[]) : Promise<Result<AuditResponse, string>> {
    var formdata = new FormData();
    formdata.append("digest", digest);
    formdata.append("orderId", orderId);

    for (const file of files) {
        formdata.append("files", file, file.name);
    }

    var requestOptions: RequestInit = {
        method: 'POST',
        body: formdata,
        redirect: 'follow'
    }

    try {
        const response = await fetch(`${currentConfig.API_Url}/audits`, requestOptions)
        const data: AuditResponse = await response.json();

        if (data.message === "OK") {
            return { ok: true, data: data };
        }

        return { ok: false, error: data.message };
        
    } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : 'Audit Failed' };
    }
}

interface AuditDetail {
    message: string;
    status: string;
    blodId: string;
    directory: string;
}

export async function GetAudit(orderId: string): Promise<Result<AuditDetail, string>> {
    var requestOptions = {
        method: 'GET'
    };

    try {
        const response = await fetch(`${currentConfig.API_Url}/audits?orderId=${orderId}`, requestOptions)
        const data: AuditDetail = await response.json();

        if (data.message === "OK") {
            return { ok: true, data: data };
        }
        return { ok: false, error: data.message };
    } catch (error) {
        return { ok: false, error: error instanceof Error ? error.message : 'Audit Failed' };
    }
}