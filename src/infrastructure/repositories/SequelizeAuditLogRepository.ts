import { IAuditLogRipository } from "../../domain";
import { AuditLog } from "../../domain";
import { AuditLogModel } from "../database";

export class SequelizeAuditLogRepository implements IAuditLogRipository {
    async create(log: AuditLog): Promise<AuditLog> {
        const created = await AuditLogModel.create({
            action: log.action,
            performedBy: log.performedBy,
            targetType: log.targetType,
            targetId: log.targetId,
            details: log.details
        });

        return new AuditLog(
            created.id,
            created.action,
            created.performedBy,
            created.targetType,
            created.targetId,
            created.details
        )
    }
}