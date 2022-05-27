import Component from "./base.js";
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project.js";
import { Validator } from "../utils/validator.js";

export class ProjectForm extends Component<HTMLDivElement, HTMLFormElement> {
  title: HTMLInputElement;
  description: HTMLInputElement;
  people: HTMLInputElement;

  constructor() {
    super("form-template", "app", "project-form");

    this.configure();

    this.title = this.element.querySelector("#title") as HTMLInputElement;

    this.description = this.element.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.people = this.element.querySelector("#people") as HTMLInputElement;
  }

  @autobind
  configure() {
    this.element.addEventListener("submit", this.submit);
  }

  private submit(e: Event) {
    e.preventDefault();

    const validator = new Validator();

    const data = {
      title: this.title.value,
      description: this.description.value,
      people: this.people.value,
    };

    validator.make(data, {
      title: "required|max:10",
      description: "required|min:10|max:50",
      people: "required|max:5",
    });

    if (validator.fails()) {
      alert("This given data is invalid");
    } else {
      projectState.add(data.title, data.description, parseInt(data.people));
      this.reset();
    }
  }

  private reset() {
    this.title.value = "";
    this.description.value = "";
    this.people.value = "";
  }
}
