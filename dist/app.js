"use strict";
class ProjectForm {
    constructor() {
        this.template = document.getElementById("project-form");
        this.container = document.getElementById("app");
        this.form = document.importNode(this.template.content, true)
            .firstElementChild;
        this.attach();
    }
    attach() {
        this.container.insertAdjacentElement("afterbegin", this.form);
    }
}
new ProjectForm();
