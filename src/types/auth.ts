export type LoginResponse = {
    access_token: string;
    token_type: string;
    refresh_token: string;
    expires_in: number;
    scope: string;
    name: string;
}

export type TokenDecoded = {
    user_name: string;
    scope: string[];
    active: boolean;
    exp: number;
    authorities: Authorities[];
    jti: string;
    client_id: string;
}

export type Authorities = "ROLE_OPERATOR" | "ROLE_ADMIN";