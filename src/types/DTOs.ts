export interface LoggedUserDTO {
    firstName: string,
    lastName: string,
    email: string,
    createdAt: string,
    updatedAt: string
}

export interface TestImage {
    id: string;
    author: string;
    width: number;
    height: number;
    url: string;
    download_url: string;
}