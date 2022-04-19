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
        this.configure();
        this.container.insertAdjacentElement(where, this.element);
    }
}
class ProjectForm extends Component {
    constructor() {
        super("form-template", "app", "project-form");
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
        super("projects-container", "app", `${type}-projects`);
        this.type = type;
        this.projects = [];
        const header = this.element.querySelector("h2");
        header.innerText = `${type.toUpperCase()} PROJECTS`;
    }
    configure() {
        projectState.listener((projects) => {
            this.projects = projects.filter((project) => {
                if (this.type === "active")
                    return project.status === ProjectStatus.Active;
                return project.status === ProjectStatus.Finished;
            });
            const ul = document.querySelector(`#${this.type}-projects ul`);
            for (const project of this.projects) {
                const li = document.createElement("li");
                li.textContent = project.title;
                ul.appendChild(li);
            }
        });
    }
}
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
        for (const listener of this.listeners) {
            listener(this.projects.slice());
        }
    }
}
const projectState = ProjectState.getInstance();
new ProjectForm();
new ProjectContainer("active");
new ProjectContainer("finished");
