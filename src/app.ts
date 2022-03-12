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

    validator.make(
      {
        title: this.title.value,
        description: this.description.value,
        people: this.people.value,
      },
      {
        title: "required|max:10",
        description: "required|min:10|max:50",
        people: "required|max:5",
      }
    );

    if (validator.fails()) {
      alert("This given data is invalid");
    } else {
      console.log("sucess");
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
    console.log(value.length);
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

new ProjectForm();
