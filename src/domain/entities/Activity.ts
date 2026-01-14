interface ActivityProps {
  id: string;
  userId: string;
  action: string;
  entity: string;
  entityId: string;
  createdAt: Date;
}

export class Activity {
  readonly id: string;
  readonly userId: string;
  readonly action: string;
  readonly entity: string;
  readonly entityId: string;
  readonly createdAt: Date;

  private constructor(props: ActivityProps) {
    this.id = props.id;
    this.userId = props.userId;
    this.action = props.action;
    this.entity = props.entity;
    this.entityId = props.entityId;
    this.createdAt = props.createdAt;
  }

  static create(params: {
    userId: string;
    action: string;
    entity: string;
    entityId: string;
  }): Activity {
    return new Activity({
      id: "", // will be assigned by DB
      userId: params.userId,
      action: params.action,
      entity: params.entity,
      entityId: params.entityId,
      createdAt: new Date(),
    });
  }

  static fromPersistence(props: ActivityProps): Activity {
    return new Activity(props);
  }
}