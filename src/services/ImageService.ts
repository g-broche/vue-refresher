import type { ApiResponse } from "@/types/Responses";
import { BaseApiService } from "./BaseApiService";
import type { LoginRequest, RegisterRequest } from "@/types/Requests";
import type { TestImage } from "@/types/DTOs";

const BASE_API_URL = "https://picsum.photos/v2"

const ENDPOINTS = {
    list: "/list",
}

const DEFAULT_LIMIT = 20;

interface ListRequestParameters {
    page?: number;
    limit?: number;
}

/**
 * This is currently only used for testing useQuery through an outside API.
 * For this reason the class will currently not inherit from BaseApiService
 * as the source of data will differ.
 * This my change in the future if the backend project of this app handles
 * image CRUD and can be used for the purpose of storing and serving images. 
 */
class ImageService {
    constructor() {
    }

    async getImagePage(
        { page = 1, limit = DEFAULT_LIMIT }: ListRequestParameters = {}
    ): Promise<TestImage[]> {
        const builtUrl = `${BASE_API_URL}${ENDPOINTS.list}?page=${page}&limit=${limit}`
        console.log(`>>> Making request at: ${builtUrl}`)
        const response = await fetch(builtUrl, {
            headers: {
                "Content-Type": "application/json",
            },
        });

        if (!response.ok) {
            const error = await response.json().catch(() => ({}));
            throw new Error(error.message || "API error");
        }

        return response.json() as Promise<TestImage[]>;
    }
}

export const imageService = new ImageService();