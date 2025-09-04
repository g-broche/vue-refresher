import type { LoggedUserDTO } from "./DTOs";

export interface ApiResponse {
    isSuccess: boolean;
    message: string | null;
    data: any
}

export interface ApiResponseSuccess {
    isSuccess: true;
    message: string | null;
    data: any
}

export interface ApiResponseError {
    isSuccess: false;
    message: string;
    data: any
}

export interface ApiAuthResponse {
    isSuccess: true;
    message: string | null;
    data: LoggedUserDTO;
}
