export type LoginResponse = {
    access_token: null|string;
    token_type: null|string;
    refresh_token: null|string;
    expires_in: null|number;
    scope: null|string;
    name: null|string;
    authenticated: boolean;
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