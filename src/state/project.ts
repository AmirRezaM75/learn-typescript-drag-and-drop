export enum ProjectStatus {
  Active,
  Finished,
}

export class Project {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public people: number,
    public status: ProjectStatus
  ) {}
}

type ProjectListener = (projects: Project[]) => void;

class ProjectState {
  private listeners: ProjectListener[] = [];
  projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {}

  static getInstance() {
    if (!this.instance) this.instance = new ProjectState();

    return this.instance;
  }

  listener(fn: ProjectListener) {
    this.listeners.push(fn);
  }

  add(title: string, description: string, people: number) {
    const project = new Project(
      Math.random().toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );

    this.projects.push(project);

    this.listen();
  }

  update(projectId: string, status: ProjectStatus) {
    const project = this.projects.find((project) => project.id === projectId);

    if (project && project.status !== status) {
      project.status = status;

      this.listen();
    }
  }

  listen() {
    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
}

export const projectState = ProjectState.getInstance();
