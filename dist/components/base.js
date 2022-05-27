export default class Component {
    constructor(templateId, containerId, elementId, where = "beforeend") {
        this.template = document.getElementById(templateId);
        this.container = document.getElementById(containerId);
        this.element = document.importNode(this.template.content, true)
            .firstElementChild;
        if (elementId)
            this.element.id = elementId;
        this.container.insertAdjacentElement(where, this.element);
    }
}
