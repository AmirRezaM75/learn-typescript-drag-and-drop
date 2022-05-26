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
        },
    };
}
class Component {
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
class ProjectForm extends Component {
    constructor() {
        super("form-template", "app", "project-form");
        this.configure();
        this.title = this.element.querySelector("#title");
        this.description = this.element.querySelector("#description");
        this.people = this.element.querySelector("#people");
    }
    configure() {
        this.element.addEventListener("submit", this.submit);
    }
    submit(e) {
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
        }
        else {
            projectState.add(data.title, data.description, parseInt(data.people));
            this.reset();
        }
    }
    reset() {
        this.title.value = "";
        this.description.value = "";
        this.people.value = "";
    }
}
__decorate([
    autobind
], ProjectForm.prototype, "configure", null);
class ProjectContainer extends Component {
    constructor(type) {
        super("projects-container", "app", `${type}-projects-container`);
        this.type = type;
        this.projects = [];
        this.configure();
        const header = this.element.querySelector("h2");
        header.innerText = `${type.toUpperCase()} PROJECTS`;
    }
    dropHandler(event) {
        if (event.dataTransfer) {
            const projectId = event.dataTransfer.getData("text/plain");
            projectState.update(projectId, this.type === "active" ? ProjectStatus.Active : ProjectStatus.Finished);
        }
    }
    dragOverHandler(event) {
        if (event.dataTransfer && event.dataTransfer.types[0] === "text/plain") {
            // By default, data/elements cannot be dropped in other elements.
            // To allow a drop, we must prevent the default handling of the element.
            event.preventDefault();
            this.element.querySelector("ul").classList.add("droppable");
        }
    }
    dragLeaveHandler(event) {
        this.element.querySelector("ul").classList.remove("droppable");
    }
    configure() {
        this.element.addEventListener("dragleave", this.dragLeaveHandler);
        this.element.addEventListener("dragover", this.dragOverHandler);
        this.element.addEventListener("drop", this.dropHandler);
        projectState.listener((projects) => {
            this.projects = projects.filter((project) => {
                if (this.type === "active")
                    return project.status === ProjectStatus.Active;
                return project.status === ProjectStatus.Finished;
            });
            const ul = document.querySelector(`#${this.type}-projects-container ul`);
            ul.id = `${this.type}-projects`;
            ul.innerHTML = "";
            for (const project of this.projects) {
                new ProjectItem(project);
            }
        });
    }
}
__decorate([
    autobind
], ProjectContainer.prototype, "dropHandler", null);
__decorate([
    autobind
], ProjectContainer.prototype, "dragOverHandler", null);
__decorate([
    autobind
], ProjectContainer.prototype, "dragLeaveHandler", null);
class ProjectItem extends Component {
    constructor(project) {
        const containerId = project.status === ProjectStatus.Active
            ? "active-projects"
            : "finished-projects";
        super("project-item", containerId);
        this.project = project;
        this.configure();
    }
    get people() {
        return this.project.people === 1
            ? "1 Person"
            : `${this.project.people} People`;
    }
    configure() {
        this.element.addEventListener("dragstart", this.dragStartHandler);
        this.element.addEventListener("dragend", this.dragEndHandler);
        this.element.querySelector("h2").textContent = this.project.title;
        this.element.querySelector("h3").textContent = this.people;
        this.element.querySelector("p").textContent = this.project.description;
    }
    dragStartHandler(event) {
        if (event.dataTransfer) {
            event.dataTransfer.setData("text/plain", this.project.id);
            event.dataTransfer.effectAllowed = "move";
        }
    }
    dragEndHandler(event) {
        console.log(event);
    }
}
__decorate([
    autobind
], ProjectItem.prototype, "dragStartHandler", null);
class Validator {
    constructor() {
        this.data = {};
        this.rules = {};
    }
    make(data, rules) {
        this.data = data;
        this.rules = rules;
        return this;
    }
    fails() {
        let fails = false;
        Object.keys(this.data).forEach((key) => {
            if (this.rules[key]) {
                const rules = this.rules[key].split("|");
                rules.forEach((rule) => {
                    if (rule.includes(":")) {
                        const [statute, value] = rule.split(":");
                        if (this[statute] &&
                            this[statute](this.data[key], +value) === false) {
                            fails = true;
                        }
                    }
                    if (this[rule] &&
                        /* @ts-ignore */
                        this[rule](this.data[key]) === false) {
                        fails = true;
                    }
                });
            }
        });
        return fails;
    }
    required(value) {
        return value.length > 0;
    }
    min(value, minimum) {
        if (typeof value === "string") {
            return value.length >= minimum;
        }
        else {
            return value >= minimum;
        }
    }
    max(value, maximum) {
        if (typeof value === "string") {
            return value.length <= maximum;
        }
        else {
            return value <= maximum;
        }
    }
}
var ProjectStatus;
(function (ProjectStatus) {
    ProjectStatus[ProjectStatus["Active"] = 0] = "Active";
    ProjectStatus[ProjectStatus["Finished"] = 1] = "Finished";
})(ProjectStatus || (ProjectStatus = {}));
class Project {
    constructor(id, title, description, people, status) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.people = people;
        this.status = status;
    }
}
class ProjectState {
    constructor() {
        this.listeners = [];
        this.projects = [];
    }
    static getInstance() {
        if (!this.instance)
            this.instance = new ProjectState();
        return this.instance;
    }
    listener(fn) {
        this.listeners.push(fn);
    }
    add(title, description, people) {
        const project = new Project(Math.random().toString(), title, description, people, ProjectStatus.Active);
        this.projects.push(project);
        this.listen();
    }
    update(projectId, status) {
        const project = this.projects.find((project) => project.id === projectId);
        if (project && project.status !== status) {
            project.status = status;
            this.listen();
        }
    }
    listen() {
        for (const listener of this.listeners) {
            listener(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
new ProjectForm();
new ProjectContainer("active");
new ProjectContainer("finished");
