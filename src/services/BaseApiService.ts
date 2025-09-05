import type { ApiResponse } from "@/types/Responses";

export class BaseApiService {
    private baseUrl: string;

    constructor() {
        this.baseUrl = import.meta.env.VITE_API_BASE_URL;
    }

    async request(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<ApiResponse> {
        const requestUrl = `${this.baseUrl}${endpoint}`
        console.log(`>>> Making request at: ${requestUrl}`)
        const response = await fetch(requestUrl, {
            ...options,
            headers: {
                "Content-Type": "application/json",
                ...(options.headers || {}),
            },
            credentials: "include",
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "API error");
        }

        return response.json() as Promise<ApiResponse>;
    }
}