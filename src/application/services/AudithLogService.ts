import { IAuditLogRipository } from "../../domain";
import { AuditLog } from "../../domain";

export class AuditLogService {
    constructor(private auditRepo: IAuditLogRipository) {}

    async logAction(params: {
        action: string;
        performedBy: string;
        targetType: string;
        targetId: string;
        details?: any;
    }): Promise<AuditLog> {
        const log = new AuditLog(
            params.action,
            params.performedBy,
            params.targetType,
            params.targetId,
            params.details
        );

        return this.auditRepo.create(log);
    }
}