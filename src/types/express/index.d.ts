import { AccessTokenPayload } from "../../application/dtos/AccessTokenPayload";

declare global {
    namespace Express {
        interface Request {
            user?: AccessTokenPayload; // sub: string, roles: string[]
        }
    }
}