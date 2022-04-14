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

class ProjectForm {
  container: HTMLDivElement;
  template: HTMLTemplateElement;
  form: HTMLFormElement;
  title: HTMLInputElement;
  description: HTMLInputElement;
  people: HTMLInputElement;

  constructor() {
    this.template = document.getElementById("template")! as HTMLTemplateElement;

    this.container = document.getElementById("app")! as HTMLDivElement;

    this.form = document.importNode(this.template.content, true)
      .firstElementChild as HTMLFormElement;
    this.form.id = "project-form";

    this.title = this.form.querySelector("#title") as HTMLInputElement;

    this.description = this.form.querySelector(
      "#description"
    ) as HTMLInputElement;

    this.people = this.form.querySelector("#people") as HTMLInputElement;

    this.attach();

    this.configure();
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

  @autobind
  private configure() {
    this.form.addEventListener("submit", this.submit);
  }

  attach() {
    this.container.insertAdjacentElement("afterbegin", this.form);
  }
}

class ProjectContainer {
  projects: Project[] = [];

  container: HTMLDivElement;

  template: HTMLTemplateElement;

  element: HTMLElement;

  constructor(type: "active" | "finished") {
    this.container = document.getElementById("app")! as HTMLDivElement;

    this.template = document.getElementById(
      "projects-container"
    )! as HTMLTemplateElement;

    this.element = document.importNode(this.template.content, true)
      .firstElementChild! as HTMLElement;
    this.element.id = `${type}-projects`;

    const header = this.element.querySelector("h2")! as HTMLHeadElement;
    header.innerText = `${type.toUpperCase()} Projects`;

    projectState.listener((projects) => {
      this.projects = projects;
      const ul = document.querySelector('ul') ! as HTMLUListElement;
      for (const project of this.projects) {
        const li = document.createElement('li')
        li.textContent = project.title
        ul.appendChild(li)
      }
    });

    this.container.insertAdjacentElement("beforeend", this.element);
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
    private id: string,
    private title: string,
    private description: string,
    private people: number,
    private status: ProjectStatus
  ) {}
}

type ProjectListner = (projects: Project[]) => void;

class ProjectState {
  private listeners: ProjectListner[] = [];
  projects: Project[] = [];
  private static instance: ProjectState;
  private constructor() {}

  static getInstance() {
    if (!this.instance) this.instance = new ProjectState();

    return this.instance;
  }

  listener(fn: ProjectListner) {
    this.listeners.push(fn);
  }

  add(title: string, description: string, people: number) {
    const project = new Project(
      Math.random.toString(),
      title,
      description,
      people,
      ProjectStatus.Active
    );

    this.projects.push(project);

    for (const listner of this.listeners) {
      listner(this.projects.slice());
    }
  }
}

const projectState = ProjectState.getInstance();

new ProjectForm();
new ProjectContainer("active");
new ProjectContainer("finished");
