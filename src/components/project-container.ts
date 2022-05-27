import { autobind } from "../decorators/autobind";
import Component from "./base";
import { Droppable } from "../interfaces/droppable";
import { ProjectItem } from "./project-item";
import { Project, projectState, ProjectStatus } from "../state/project";

export class ProjectContainer
  extends Component<HTMLDivElement, HTMLElement>
  implements Droppable
{
  projects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("projects-container", "app", `${type}-projects-container`);

    this.configure();

    const header = this.element.querySelector("h2")! as HTMLHeadElement;
    header.innerText = `${type.toUpperCase()} PROJECTS`;
  }

  @autobind
  dropHandler(event: DragEvent): void {
    if (event.dataTransfer) {
      const projectId = event.dataTransfer.getData("text/plain");
      projectState.update(
        projectId,
        this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished
      );
    }
  }

  @autobind
  dragOverHandler(event: DragEvent): void {
    if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
      // By default, data/elements cannot be dropped in other elements.
      // To allow a drop, we must prevent the default handling of the element.
      event.preventDefault();
      this.element.querySelector("ul")!.classList.add("droppable");
    }
  }

  @autobind
  dragLeaveHandler(event: DragEvent): void {
    this.element.querySelector("ul")!.classList.remove("droppable");
  }

  configure(): void {
    this.element.addEventListener("dragleave", this.dragLeaveHandler);
    this.element.addEventListener("dragover", this.dragOverHandler);
    this.element.addEventListener("drop", this.dropHandler);

    projectState.listener((projects) => {
      this.projects = projects.filter((project) => {
        if (this.type === "active")
          return project.status === ProjectStatus.Active;
        return project.status === ProjectStatus.Finished;
      });

      const ul = document.querySelector(
        `#${this.type}-projects-container ul`
      )! as HTMLUListElement;
      ul.id = `${this.type}-projects`;
      ul.innerHTML = "";

      for (const project of this.projects) {
        new ProjectItem(project);
      }
    });
  }
}