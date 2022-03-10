"use strict";
class ProjectForm {
    constructor() {
        this.template = document.getElementById("template");
        this.container = document.getElementById("app");
        this.form = document.importNode(this.template.content, true)
            .firstElementChild;
        this.form.id = "project-form";
        this.title = this.form.querySelector("#title");
        this.description = this.form.querySelector("#description");
        this.people = this.form.querySelector("#people");
        this.attach();
        this.configure();
    }
    submit(e) {
        e.preventDefault();
        console.log(this.title.value);
    }
    configure() {
        this.form.addEventListener("submit", this.submit);
    }
    attach() {
        this.container.insertAdjacentElement("afterbegin", this.form);
    }
}
new ProjectForm();
