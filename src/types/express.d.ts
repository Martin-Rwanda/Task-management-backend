import { JwtPayload } from "../application/dtos/AccessTokenPayload";

declare global {
    namespace Express {
        interface Request {
            user?: {
                id: string;
                role?: string;
            };
        }
    }
}