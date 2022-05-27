var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import Component from "./base.js";
import { autobind } from "../decorators/autobind.js";
import { projectState } from "../state/project.js";
import { Validator } from "../utils/validator.js";
export class ProjectForm extends Component {
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
