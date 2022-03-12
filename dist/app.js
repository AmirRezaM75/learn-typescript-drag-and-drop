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
        const validator = new Validator();
        validator.make({
            title: this.title.value,
            description: this.description.value,
            people: this.people.value,
        }, {
            title: "required|max:10",
            description: "required|min:10|max:50",
            people: "required|max:5",
        });
        if (validator.fails()) {
            alert("This given data is invalid");
        }
        else {
            console.log("sucess");
            this.reset();
        }
    }
    reset() {
        this.title.value = "";
        this.description.value = "";
        this.people.value = "";
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
        console.log(value.length);
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
new ProjectForm();
