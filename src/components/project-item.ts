import Component from "./base.js";
import { Draggable } from "../interfaces/draggable.js";
import { autobind } from "../decorators/autobind.js";
import { Project, ProjectStatus } from "../state/project.js";

export class ProjectItem
  extends Component<HTMLUListElement, HTMLLIElement>
  implements Draggable
{
  constructor(private project: Project) {
    const containerId =
      project.status === ProjectStatus.Active
        ? "active-projects"
        : "finished-projects";

    super("project-item", containerId);

    this.configure();
  }

  get people() {
    return this.project.people === 1
      ? "1 Person"
      : `${this.project.people} People`;
  }

  configure(): void {
    this.element.addEventListener("dragstart", this.dragStartHandler);
    this.element.addEventListener("dragend", this.dragEndHandler);
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.people;
    this.element.querySelector("p")!.textContent = this.project.description;
  }

  @autobind
  dragStartHandler(event: DragEvent): void {
    if (event.dataTransfer) {
      event.dataTransfer.setData("text/plain", this.project.id);
      event.dataTransfer.effectAllowed = "move";
    }
  }

  dragEndHandler(event: DragEvent): void {
    console.log(event);
  }
}
