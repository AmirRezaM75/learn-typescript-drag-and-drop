export var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
export class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }
    listener(fn) {
        this.listeners.push(fn);
    }
    add(title, description, people) {
        const project = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(project);
        this.listen();
    }
    update(projectId, status) {
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
