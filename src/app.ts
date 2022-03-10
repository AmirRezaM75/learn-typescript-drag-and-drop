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
    console.log(this.title.value);
  }

  private configure() {
    this.form.addEventListener("submit", this.submit);
  }

  attach() {
    this.container.insertAdjacentElement("afterbegin", this.form);
  }
}

new ProjectForm();
