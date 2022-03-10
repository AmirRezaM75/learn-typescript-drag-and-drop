class ProjectForm {
  container: HTMLDivElement;
  template: HTMLTemplateElement;
  form: HTMLFormElement;

  constructor() {
    this.template = document.getElementById(
      "project-form"
    )! as HTMLTemplateElement;

    this.container = document.getElementById("app")! as HTMLDivElement;

    this.form = document.importNode(this.template.content, true)
      .firstElementChild as HTMLFormElement;
 
    this.attach();
  }

  attach() {
    this.container.insertAdjacentElement("afterbegin", this.form);
  }
}

new ProjectForm();
