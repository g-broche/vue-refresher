import type { ApiResponse } from "@/types/Responses";
import { BaseApiService } from "./BaseApiService";
import type { LoginRequest, RegisterRequest } from "@/types/Requests";

const ENDPOINTS = {
    register: "/api/auth/register",
    login: "/api/auth/login",
    logout: "/api/auth/logout",
}

class AuthService extends BaseApiService {
    constructor() {
        super();
    }

    async login(loginData: LoginRequest): Promise<ApiResponse> {
        return this.request(ENDPOINTS.login, {
            method: "POST",
            body: JSON.stringify(loginData),
        });
    }

    async register(registerData: RegisterRequest): Promise<ApiResponse> {
        return this.request(ENDPOINTS.register, {
            method: "POST",
            body: JSON.stringify(registerData),
        });
    }

    async logout(): Promise<ApiResponse> {
        return this.request(ENDPOINTS.logout, { method: "POST" });
    }
}

export const authService = new AuthService();