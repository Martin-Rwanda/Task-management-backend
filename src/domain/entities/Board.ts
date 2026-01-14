interface BoardProps {
  id: string;
  name: string;
  projectId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date | null;
}

export class Board {
  readonly id: string;
  readonly name: string;
  readonly projectId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date | null;

  private constructor(props: BoardProps) {
    this.id = props.id;
    this.name = props.name;
    this.projectId = props.projectId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static create(params: {
    name: string;
    projectId: string;
  }): Board {
    if (!params.name.trim()) {
      throw new Error("Board name cannot be empty");
    }

    return new Board({
      id: "",
      name: params.name.trim(),
      projectId: params.projectId,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
  }

  static fromPersistence(props: BoardProps): Board {
    return new Board(props);
  }
}