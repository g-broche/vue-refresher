import { defineStore } from "pinia";
import { authService } from "@/services/AuthService";
import type { LoggedUserDTO } from "@/types/DTOs";
import type { LoginRequest, RegisterRequest } from "@/types/Requests";
import type { ApiAuthResponse } from "@/types/Responses";

export const useAuthStore = defineStore("auth", {
    state: () => ({
        user: null as LoggedUserDTO | null,
        loading: false,
        error: null as string | null
    }),

    getters: {
        isAuthenticated: (state) => !!state.user,
    },

    actions: {
        async login(loginData: LoginRequest) {
            this.loading = true;
            this.error = null;
            try {
                const res = await authService.login(loginData);
                console.log("response login", res);
                if (!res.isSuccess || !res.data) {
                    throw new Error(res.message || "An unknown error occurred during login attempt");
                }
                const successResponse = res as ApiAuthResponse;
                this.user = successResponse.data;
            } catch (err) {
                this.error = err instanceof Error ? err.message : "Unknown error during the operation";
                throw err
            } finally {
                this.loading = false;
            }
        },

        async register(registerRequest: RegisterRequest) {
            this.loading = true;
            this.error = null;
            try {
                const res = await authService.register(registerRequest);
                console.log("response register", res);
                if (!res.isSuccess || !res.data) {
                    throw new Error(res.message || "An unknown error occurred during login attempt");
                }
                const successResponse = res as ApiAuthResponse;
                this.user = successResponse.data;
            } catch (err) {
                this.error = err instanceof Error ? err.message : "Unknown error during the operation";
                throw err
            } finally {
                this.loading = false;
            }
        },

        async logout() {
            this.loading = true;
            this.error = null;
            try {
                await authService.logout();
                this.user = null;
            } catch (err) {
                this.error = err instanceof Error ? err.message : "Unknown error during the operation";
                throw err
            } finally {
                this.loading = false;
            }

        },
    },
});