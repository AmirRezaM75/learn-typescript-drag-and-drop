export default abstract class Component<T extends HTMLElement, U extends HTMLElement> {
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
