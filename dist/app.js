"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
function autobind(target, propertyKey, descriptor) {
    return {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        }
    };
}
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
__decorate([
    autobind
], ProjectForm.prototype, "configure", null);
new ProjectForm();
