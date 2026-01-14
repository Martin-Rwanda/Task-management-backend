interface ProjectProps {
  id: string;
  name: string;
  ownerId: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}


export class Project {
  readonly id: string;
  readonly name: string;
  readonly ownerId: string;
  readonly description?: string | null;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  private constructor(props: ProjectProps) {
    this.id = props.id;
    this.name = props.name;
    this.ownerId = props.ownerId;
    this.description = props.description;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static create(params :{name: string, ownerId: string, description?: string}): Project {
    const now = new Date();
    return new Project({id: "", name: params.name, ownerId: params.ownerId, description: params.description || null, createdAt: now, updatedAt:now});
  }

  static fromPersistence(props: ProjectProps): Project {
      return new Project(props);
    }
}
