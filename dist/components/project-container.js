var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { autobind } from "../decorators/autobind.js";
import Component from "./base.js";
import { ProjectItem } from "./project-item.js";
import { projectState, ProjectStatus } from "../state/project.js";
export class ProjectContainer extends Component {
    constructor(type) {
        super("projects-container", "app", `${type}-projects-container`);
        this.type = type;
        this.projects = [];
        this.configure();
        const header = this.element.querySelector("h2");
        header.innerText = `${type.toUpperCase()} PROJECTS`;
    }
    dropHandler(event) {
        if (event.dataTransfer) {
            const projectId = event.dataTransfer.getData("text/plain");
            projectState.update(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        }
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            // By default, data/elements cannot be dropped in other elements.
            // To allow a drop, we must prevent the default handling of the element.
            event.preventDefault();
            this.element.querySelector("ul").classList.add("droppable");
        }
    }
    dragLeaveHandler(event) {
        this.element.querySelector("ul").classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.listener((projects) => {
            this.projects = projects.filter((project) => {
                if (this.type === "active")
                    return project.status === ProjectStatus.Active;
                return project.status === ProjectStatus.Finished;
            });
            const ul = document.querySelector(`#${this.type}-projects-container ul`);
            ul.id = `${this.type}-projects`;
            ul.innerHTML = "";
            for (const project of this.projects) {
                new ProjectItem(project);
            }
        });
    }
}
__decorate([
    autobind
], ProjectContainer.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectContainer.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectContainer.prototype, "dragLeaveHandler", null);
