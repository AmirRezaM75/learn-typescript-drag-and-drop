function autobind(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  return {
    configurable: true,
    get() {
      return descriptor.value.bind(this);
    },
  };
}

abstract class Component<T extends HTMLElement, U extends HTMLElement> {
  template: HTMLTemplateElement;
  container: T;
  element: U;

  constructor(
    templateId: string,
    containerId: string,
    elementId?: string,
    where: InsertPosition = "beforeend"
  ) {
    this.template = document.getElementById(templateId)! as HTMLTemplateElement;

    this.container = document.getElementById(containerId)! as T;

    this.element = document.importNode(this.template.content, true)
      .firstElementChild as U;

    if (elementId) this.element.id = elementId;

    this.container.insertAdjacentElement(where, this.element);
  }

  abstract configure(): void;
}

class ProjectForm extends Component<HTMLDivElement, HTMLFormElement> {
  title: HTMLInputElement;
  description: HTMLInputElement;
  people: HTMLInputElement;

  constructor() {
    super("form-template", "app", "project-form");

    this.configure()

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

class ProjectContainer extends Component<HTMLDivElement, HTMLElement> {
  projects: Project[] = [];

  constructor(private type: "active" | "finished") {
    super("projects-container", "app", `${type}-projects-container`);

    this.configure()

    const header = this.element.querySelector("h2")! as HTMLHeadElement;
    header.innerText = `${type.toUpperCase()} PROJECTS`;
  }

  configure(): void {
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
      ul.innerHTML = ''

      for (const project of this.projects) {
        new ProjectItem(project)
      }
    });
  }
}

class ProjectItem extends Component<HTMLUListElement, HTMLLIElement> {
  constructor(private project: Project) {
    const containerId =
      project.status === ProjectStatus.Active
        ? "active-projects"
        : "finished-projects";

    super("project-item", containerId);

    this.configure()
  }

  get people() {
    return this.project.people === 1 ? '1 Person' : `${this.project.people} People`
  }

  configure(): void {
    this.element.querySelector("h2")!.textContent = this.project.title;
    this.element.querySelector("h3")!.textContent = this.people;
    this.element.querySelector("p")!.textContent = this.project.description;
  }


}

type Rule = "required" | "max" | "min";

type Validatable = Record<string, string>;

class Validator {
  private data = {} as Validatable;

  private rules = {} as Validatable;

  public make(data: Validatable, rules: Validatable) {
    this.data = data;

    this.rules = rules;

    return this;
  }

  public fails() {
    let fails = false;

    Object.keys(this.data).forEach((key) => {
      if (this.rules[key]) {
        const rules = this.rules[key].split("|") as Rule[];

        rules.forEach((rule) => {
          if (rule.includes(":")) {
            const [statute, value] = rule.split(":") as [Rule, string];

            if (
              this[statute] &&
              this[statute](this.data[key], +value) === false
            ) {
              fails = true;
            }
          }

          if (
            this[rule] &&
            /* @ts-ignore */
            this[rule](this.data[key]) === false
          ) {
            fails = true;
          }
        });
      }
    });

    return fails;
  }

  private required(value: string) {
    return value.length > 0;
  }

  private min(value: string | number, minimum: number) {
    if (typeof value === "string") {
      return value.length >= minimum;
    } else {
      return value >= minimum;
    }
  }

  private max(value: string | number, maximum: number) {
    if (typeof value === "string") {
      return value.length <= maximum;
    } else {
      return value <= maximum;
    }
  }
}

enum ProjectStatus {
  Active,
  Finished,
}

class Project {
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

    for (const listener of this.listeners) {
      listener(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

new ProjectForm();
new ProjectContainer("active");
new ProjectContainer("finished");
