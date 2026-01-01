import { AuditLogModel } from "../../infrastructure";

interface AuditLogInput {
  action: string;
  performedBy: string;
  targetType: "USER" | "ROLE" | "PERMISSION" | string;
  targetId: string;
  details?: Record<string, any>;
}

export const logAudit = async ({
  action,
  performedBy,
  targetType,
  targetId,
  details = {},
}: AuditLogInput): Promise<void> => {
  try {
    await AuditLogModel.create({
      action,
      performedBy,
      targetType,
      targetId,
      details,
    });
  } catch (error) {
    console.error("Audit log failed:", (error as Error).message);
  }
};
