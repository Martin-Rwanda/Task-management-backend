interface TaskProps {
  id: string;
  title: string;
  description: string;
  priority?: "low" | "medium" | "high" | null;
  dueDate: Date;
  boardId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt?: Date;
}


export class Task {
  readonly id: string;
  readonly title: string;
  readonly description: string;
  readonly priority?: "low" | "medium" | "high" | null;
  readonly dueDate: Date;
  readonly boardId: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly deletedAt?: Date;

  private constructor(props: TaskProps) {
    this.id = props.id;
    this.title = props.title;
    this.description = props.description;
    this.priority = props.priority;
    this.dueDate = props.dueDate;
    this.boardId = props.boardId;
    this.createdAt = props.createdAt;
    this.updatedAt = props.updatedAt;
    this.deletedAt = props.deletedAt;
  }

  static create(params :{
    title: string,
    boardId: string,
    description: string,
    priority?: "low" | "medium" | "high",
    dueDate: Date
  }): Task {
    const now = new Date();
    return new Task({
      id :"", 
      title : params.title, 
      description : params.description, 
      priority : params.priority | null, 
      dueDate : params.dueDate, 
      boardId : params.boardId, 
      createdAt : now, 
      updatedAt :now
    });
  }

  static fromPersistence(props: TaskProps): Task {
    return new Task(props);
  }
}

