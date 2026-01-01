import { AuditLog } from "../entities";

export interface IAuditLogRipository {
    create(log: AuditLog): Promise<AuditLog>;
}