export interface RefreshTokenPayload {
    userId: string;    
    roles: string[];  
    tokenType: "refresh";
}