export class AuditLog {
    constructor(
        public id: string,
        public action: string,
        public performedBy: string,
        public targetType: string,
        public targetId: string,
        public details?: any,
    ){}
}