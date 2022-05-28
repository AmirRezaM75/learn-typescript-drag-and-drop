/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/base.ts":
/*!********************************!*\
  !*** ./src/components/base.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Component)
/* harmony export */ });
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


/***/ }),

/***/ "./src/components/project-container.ts":
/*!*********************************************!*\
  !*** ./src/components/project-container.ts ***!
  \*********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectContainer": () => (/* binding */ ProjectContainer)
/* harmony export */ });
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./base */ "./src/components/base.ts");
/* harmony import */ var _project_item__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./project-item */ "./src/components/project-item.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectContainer extends _base__WEBPACK_IMPORTED_MODULE_1__["default"] {
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
            _state_project__WEBPACK_IMPORTED_MODULE_3__.projectState.update(projectId, this.type === "active" ? _state_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active : _state_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished);
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
        _state_project__WEBPACK_IMPORTED_MODULE_3__.projectState.listener((projects) => {
            this.projects = projects.filter((project) => {
                if (this.type === "active")
                    return project.status === _state_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Active;
                return project.status === _state_project__WEBPACK_IMPORTED_MODULE_3__.ProjectStatus.Finished;
            });
            const ul = document.querySelector(`#${this.type}-projects-container ul`);
            ul.id = `${this.type}-projects`;
            ul.innerHTML = "";
            for (const project of this.projects) {
                new _project_item__WEBPACK_IMPORTED_MODULE_2__.ProjectItem(project);
            }
        });
    }
}
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectContainer.prototype, "dropHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectContainer.prototype, "dragOverHandler", null);
__decorate([
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_0__.autobind
], ProjectContainer.prototype, "dragLeaveHandler", null);


/***/ }),

/***/ "./src/components/project-form.ts":
/*!****************************************!*\
  !*** ./src/components/project-form.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectForm": () => (/* binding */ ProjectForm)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/components/base.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
/* harmony import */ var _utils_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../utils/validator */ "./src/utils/validator.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};




class ProjectForm extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
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
        const validator = new _utils_validator__WEBPACK_IMPORTED_MODULE_3__.Validator();
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
            _state_project__WEBPACK_IMPORTED_MODULE_2__.projectState.add(data.title, data.description, parseInt(data.people));
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
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectForm.prototype, "configure", null);


/***/ }),

/***/ "./src/components/project-item.ts":
/*!****************************************!*\
  !*** ./src/components/project-item.ts ***!
  \****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ProjectItem": () => (/* binding */ ProjectItem)
/* harmony export */ });
/* harmony import */ var _base__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./base */ "./src/components/base.ts");
/* harmony import */ var _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../decorators/autobind */ "./src/decorators/autobind.ts");
/* harmony import */ var _state_project__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../state/project */ "./src/state/project.ts");
var __decorate = (undefined && undefined.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};



class ProjectItem extends _base__WEBPACK_IMPORTED_MODULE_0__["default"] {
    constructor(project) {
        const containerId = project.status === _state_project__WEBPACK_IMPORTED_MODULE_2__.ProjectStatus.Active
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
    _decorators_autobind__WEBPACK_IMPORTED_MODULE_1__.autobind
], ProjectItem.prototype, "dragStartHandler", null);


/***/ }),

/***/ "./src/decorators/autobind.ts":
/*!************************************!*\
  !*** ./src/decorators/autobind.ts ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autobind": () => (/* binding */ autobind)
/* harmony export */ });
function autobind(target, propertyKey, descriptor) {
    return {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        },
    };
}


/***/ }),

/***/ "./src/state/project.ts":
/*!******************************!*\
  !*** ./src/state/project.ts ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Project": () => (/* binding */ Project),
/* harmony export */   "ProjectStatus": () => (/* binding */ ProjectStatus),
/* harmony export */   "projectState": () => (/* binding */ projectState)
/* harmony export */ });
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


/***/ }),

/***/ "./src/utils/validator.ts":
/*!********************************!*\
  !*** ./src/utils/validator.ts ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "Validator": () => (/* binding */ Validator)
/* harmony export */ });
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


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!********************!*\
  !*** ./src/app.ts ***!
  \********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_project_container__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/project-container */ "./src/components/project-container.ts");
/* harmony import */ var _components_project_form__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/project-form */ "./src/components/project-form.ts");


new _components_project_form__WEBPACK_IMPORTED_MODULE_1__.ProjectForm();
new _components_project_container__WEBPACK_IMPORTED_MODULE_0__.ProjectContainer("active");
new _components_project_container__WEBPACK_IMPORTED_MODULE_0__.ProjectContainer("finished");

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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QUFJLDJFQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0FBQy9CLElBQUksMkVBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly90eXBlc2NyaXB0LWRyYWctYW5kLWRyb3AvLi9zcmMvY29tcG9uZW50cy9iYXNlLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtZHJhZy1hbmQtZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtY29udGFpbmVyLnRzIiwid2VicGFjazovL3R5cGVzY3JpcHQtZHJhZy1hbmQtZHJvcC8uL3NyYy9jb21wb25lbnRzL3Byb2plY3QtZm9ybS50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWRyYWctYW5kLWRyb3AvLi9zcmMvY29tcG9uZW50cy9wcm9qZWN0LWl0ZW0udHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1kcmFnLWFuZC1kcm9wLy4vc3JjL2RlY29yYXRvcnMvYXV0b2JpbmQudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1kcmFnLWFuZC1kcm9wLy4vc3JjL3N0YXRlL3Byb2plY3QudHMiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1kcmFnLWFuZC1kcm9wLy4vc3JjL3V0aWxzL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWRyYWctYW5kLWRyb3Avd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vdHlwZXNjcmlwdC1kcmFnLWFuZC1kcm9wL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWRyYWctYW5kLWRyb3Avd2VicGFjay9ydW50aW1lL2hhc093blByb3BlcnR5IHNob3J0aGFuZCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWRyYWctYW5kLWRyb3Avd2VicGFjay9ydW50aW1lL21ha2UgbmFtZXNwYWNlIG9iamVjdCIsIndlYnBhY2s6Ly90eXBlc2NyaXB0LWRyYWctYW5kLWRyb3AvLi9zcmMvYXBwLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGFic3RyYWN0IGNsYXNzIENvbXBvbmVudDxUIGV4dGVuZHMgSFRNTEVsZW1lbnQsIFUgZXh0ZW5kcyBIVE1MRWxlbWVudD4ge1xuICB0ZW1wbGF0ZTogSFRNTFRlbXBsYXRlRWxlbWVudDtcbiAgY29udGFpbmVyOiBUO1xuICBlbGVtZW50OiBVO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHRlbXBsYXRlSWQ6IHN0cmluZyxcbiAgICBjb250YWluZXJJZDogc3RyaW5nLFxuICAgIGVsZW1lbnRJZD86IHN0cmluZyxcbiAgICB3aGVyZTogSW5zZXJ0UG9zaXRpb24gPSBcImJlZm9yZWVuZFwiXG4gICkge1xuICAgIHRoaXMudGVtcGxhdGUgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCh0ZW1wbGF0ZUlkKSEgYXMgSFRNTFRlbXBsYXRlRWxlbWVudDtcblxuICAgIHRoaXMuY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoY29udGFpbmVySWQpISBhcyBUO1xuXG4gICAgdGhpcy5lbGVtZW50ID0gZG9jdW1lbnQuaW1wb3J0Tm9kZSh0aGlzLnRlbXBsYXRlLmNvbnRlbnQsIHRydWUpXG4gICAgICAuZmlyc3RFbGVtZW50Q2hpbGQgYXMgVTtcblxuICAgIGlmIChlbGVtZW50SWQpIHRoaXMuZWxlbWVudC5pZCA9IGVsZW1lbnRJZDtcblxuICAgIHRoaXMuY29udGFpbmVyLmluc2VydEFkamFjZW50RWxlbWVudCh3aGVyZSwgdGhpcy5lbGVtZW50KTtcbiAgfVxuXG4gIGFic3RyYWN0IGNvbmZpZ3VyZSgpOiB2b2lkO1xufVxuIiwiaW1wb3J0IHsgYXV0b2JpbmQgfSBmcm9tIFwiLi4vZGVjb3JhdG9ycy9hdXRvYmluZFwiO1xuaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBEcm9wcGFibGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9kcm9wcGFibGVcIjtcbmltcG9ydCB7IFByb2plY3RJdGVtIH0gZnJvbSBcIi4vcHJvamVjdC1pdGVtXCI7XG5pbXBvcnQgeyBQcm9qZWN0LCBwcm9qZWN0U3RhdGUsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdENvbnRhaW5lclxuICBleHRlbmRzIENvbXBvbmVudDxIVE1MRGl2RWxlbWVudCwgSFRNTEVsZW1lbnQ+XG4gIGltcGxlbWVudHMgRHJvcHBhYmxlXG57XG4gIHByb2plY3RzOiBQcm9qZWN0W10gPSBbXTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHR5cGU6IFwiYWN0aXZlXCIgfCBcImZpbmlzaGVkXCIpIHtcbiAgICBzdXBlcihcInByb2plY3RzLWNvbnRhaW5lclwiLCBcImFwcFwiLCBgJHt0eXBlfS1wcm9qZWN0cy1jb250YWluZXJgKTtcblxuICAgIHRoaXMuY29uZmlndXJlKCk7XG5cbiAgICBjb25zdCBoZWFkZXIgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcImgyXCIpISBhcyBIVE1MSGVhZEVsZW1lbnQ7XG4gICAgaGVhZGVyLmlubmVyVGV4dCA9IGAke3R5cGUudG9VcHBlckNhc2UoKX0gUFJPSkVDVFNgO1xuICB9XG5cbiAgQGF1dG9iaW5kXG4gIGRyb3BIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICBjb25zdCBwcm9qZWN0SWQgPSBldmVudC5kYXRhVHJhbnNmZXIuZ2V0RGF0YShcInRleHQvcGxhaW5cIik7XG4gICAgICBwcm9qZWN0U3RhdGUudXBkYXRlKFxuICAgICAgICBwcm9qZWN0SWQsXG4gICAgICAgIHRoaXMudHlwZSA9PT0gXCJhY3RpdmVcIiA/IFByb2plY3RTdGF0dXMuQWN0aXZlIDogUHJvamVjdFN0YXR1cy5GaW5pc2hlZFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBAYXV0b2JpbmRcbiAgZHJhZ092ZXJIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyICYmIGV2ZW50LmRhdGFUcmFuc2Zlci50eXBlc1swXSA9PT0gXCJ0ZXh0L3BsYWluXCIpIHtcbiAgICAgIC8vIEJ5IGRlZmF1bHQsIGRhdGEvZWxlbWVudHMgY2Fubm90IGJlIGRyb3BwZWQgaW4gb3RoZXIgZWxlbWVudHMuXG4gICAgICAvLyBUbyBhbGxvdyBhIGRyb3AsIHdlIG11c3QgcHJldmVudCB0aGUgZGVmYXVsdCBoYW5kbGluZyBvZiB0aGUgZWxlbWVudC5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5jbGFzc0xpc3QuYWRkKFwiZHJvcHBhYmxlXCIpO1xuICAgIH1cbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnTGVhdmVIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcInVsXCIpIS5jbGFzc0xpc3QucmVtb3ZlKFwiZHJvcHBhYmxlXCIpO1xuICB9XG5cbiAgY29uZmlndXJlKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ2xlYXZlXCIsIHRoaXMuZHJhZ0xlYXZlSGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnb3ZlclwiLCB0aGlzLmRyYWdPdmVySGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcm9wXCIsIHRoaXMuZHJvcEhhbmRsZXIpO1xuXG4gICAgcHJvamVjdFN0YXRlLmxpc3RlbmVyKChwcm9qZWN0cykgPT4ge1xuICAgICAgdGhpcy5wcm9qZWN0cyA9IHByb2plY3RzLmZpbHRlcigocHJvamVjdCkgPT4ge1xuICAgICAgICBpZiAodGhpcy50eXBlID09PSBcImFjdGl2ZVwiKVxuICAgICAgICAgIHJldHVybiBwcm9qZWN0LnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5BY3RpdmU7XG4gICAgICAgIHJldHVybiBwcm9qZWN0LnN0YXR1cyA9PT0gUHJvamVjdFN0YXR1cy5GaW5pc2hlZDtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCB1bCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICAgIGAjJHt0aGlzLnR5cGV9LXByb2plY3RzLWNvbnRhaW5lciB1bGBcbiAgICAgICkhIGFzIEhUTUxVTGlzdEVsZW1lbnQ7XG4gICAgICB1bC5pZCA9IGAke3RoaXMudHlwZX0tcHJvamVjdHNgO1xuICAgICAgdWwuaW5uZXJIVE1MID0gXCJcIjtcblxuICAgICAgZm9yIChjb25zdCBwcm9qZWN0IG9mIHRoaXMucHJvamVjdHMpIHtcbiAgICAgICAgbmV3IFByb2plY3RJdGVtKHByb2plY3QpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG59IiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBhdXRvYmluZCB9IGZyb20gXCIuLi9kZWNvcmF0b3JzL2F1dG9iaW5kXCI7XG5pbXBvcnQgeyBwcm9qZWN0U3RhdGUgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdFwiO1xuaW1wb3J0IHsgVmFsaWRhdG9yIH0gZnJvbSBcIi4uL3V0aWxzL3ZhbGlkYXRvclwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdEZvcm0gZXh0ZW5kcyBDb21wb25lbnQ8SFRNTERpdkVsZW1lbnQsIEhUTUxGb3JtRWxlbWVudD4ge1xuICB0aXRsZTogSFRNTElucHV0RWxlbWVudDtcbiAgZGVzY3JpcHRpb246IEhUTUxJbnB1dEVsZW1lbnQ7XG4gIHBlb3BsZTogSFRNTElucHV0RWxlbWVudDtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcihcImZvcm0tdGVtcGxhdGVcIiwgXCJhcHBcIiwgXCJwcm9qZWN0LWZvcm1cIik7XG5cbiAgICB0aGlzLmNvbmZpZ3VyZSgpO1xuXG4gICAgdGhpcy50aXRsZSA9IHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiI3RpdGxlXCIpIGFzIEhUTUxJbnB1dEVsZW1lbnQ7XG5cbiAgICB0aGlzLmRlc2NyaXB0aW9uID0gdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXG4gICAgICBcIiNkZXNjcmlwdGlvblwiXG4gICAgKSBhcyBIVE1MSW5wdXRFbGVtZW50O1xuXG4gICAgdGhpcy5wZW9wbGUgPSB0aGlzLmVsZW1lbnQucXVlcnlTZWxlY3RvcihcIiNwZW9wbGVcIikgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBjb25maWd1cmUoKSB7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgdGhpcy5zdWJtaXQpO1xuICB9XG5cbiAgcHJpdmF0ZSBzdWJtaXQoZTogRXZlbnQpIHtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB2YWxpZGF0b3IgPSBuZXcgVmFsaWRhdG9yKCk7XG5cbiAgICBjb25zdCBkYXRhID0ge1xuICAgICAgdGl0bGU6IHRoaXMudGl0bGUudmFsdWUsXG4gICAgICBkZXNjcmlwdGlvbjogdGhpcy5kZXNjcmlwdGlvbi52YWx1ZSxcbiAgICAgIHBlb3BsZTogdGhpcy5wZW9wbGUudmFsdWUsXG4gICAgfTtcblxuICAgIHZhbGlkYXRvci5tYWtlKGRhdGEsIHtcbiAgICAgIHRpdGxlOiBcInJlcXVpcmVkfG1heDoxMFwiLFxuICAgICAgZGVzY3JpcHRpb246IFwicmVxdWlyZWR8bWluOjEwfG1heDo1MFwiLFxuICAgICAgcGVvcGxlOiBcInJlcXVpcmVkfG1heDo1XCIsXG4gICAgfSk7XG5cbiAgICBpZiAodmFsaWRhdG9yLmZhaWxzKCkpIHtcbiAgICAgIGFsZXJ0KFwiVGhpcyBnaXZlbiBkYXRhIGlzIGludmFsaWRcIik7XG4gICAgfSBlbHNlIHtcbiAgICAgIHByb2plY3RTdGF0ZS5hZGQoZGF0YS50aXRsZSwgZGF0YS5kZXNjcmlwdGlvbiwgcGFyc2VJbnQoZGF0YS5wZW9wbGUpKTtcbiAgICAgIHRoaXMucmVzZXQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIHJlc2V0KCkge1xuICAgIHRoaXMudGl0bGUudmFsdWUgPSBcIlwiO1xuICAgIHRoaXMuZGVzY3JpcHRpb24udmFsdWUgPSBcIlwiO1xuICAgIHRoaXMucGVvcGxlLnZhbHVlID0gXCJcIjtcbiAgfVxufVxuIiwiaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiLi9iYXNlXCI7XG5pbXBvcnQgeyBEcmFnZ2FibGUgfSBmcm9tIFwiLi4vaW50ZXJmYWNlcy9kcmFnZ2FibGVcIjtcbmltcG9ydCB7IGF1dG9iaW5kIH0gZnJvbSBcIi4uL2RlY29yYXRvcnMvYXV0b2JpbmRcIjtcbmltcG9ydCB7IFByb2plY3QsIFByb2plY3RTdGF0dXMgfSBmcm9tIFwiLi4vc3RhdGUvcHJvamVjdFwiO1xuXG5leHBvcnQgY2xhc3MgUHJvamVjdEl0ZW1cbiAgZXh0ZW5kcyBDb21wb25lbnQ8SFRNTFVMaXN0RWxlbWVudCwgSFRNTExJRWxlbWVudD5cbiAgaW1wbGVtZW50cyBEcmFnZ2FibGVcbntcbiAgY29uc3RydWN0b3IocHJpdmF0ZSBwcm9qZWN0OiBQcm9qZWN0KSB7XG4gICAgY29uc3QgY29udGFpbmVySWQgPVxuICAgICAgcHJvamVjdC5zdGF0dXMgPT09IFByb2plY3RTdGF0dXMuQWN0aXZlXG4gICAgICAgID8gXCJhY3RpdmUtcHJvamVjdHNcIlxuICAgICAgICA6IFwiZmluaXNoZWQtcHJvamVjdHNcIjtcblxuICAgIHN1cGVyKFwicHJvamVjdC1pdGVtXCIsIGNvbnRhaW5lcklkKTtcblxuICAgIHRoaXMuY29uZmlndXJlKCk7XG4gIH1cblxuICBnZXQgcGVvcGxlKCkge1xuICAgIHJldHVybiB0aGlzLnByb2plY3QucGVvcGxlID09PSAxXG4gICAgICA/IFwiMSBQZXJzb25cIlxuICAgICAgOiBgJHt0aGlzLnByb2plY3QucGVvcGxlfSBQZW9wbGVgO1xuICB9XG5cbiAgY29uZmlndXJlKCk6IHZvaWQge1xuICAgIHRoaXMuZWxlbWVudC5hZGRFdmVudExpc3RlbmVyKFwiZHJhZ3N0YXJ0XCIsIHRoaXMuZHJhZ1N0YXJ0SGFuZGxlcik7XG4gICAgdGhpcy5lbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJkcmFnZW5kXCIsIHRoaXMuZHJhZ0VuZEhhbmRsZXIpO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDJcIikhLnRleHRDb250ZW50ID0gdGhpcy5wcm9qZWN0LnRpdGxlO1xuICAgIHRoaXMuZWxlbWVudC5xdWVyeVNlbGVjdG9yKFwiaDNcIikhLnRleHRDb250ZW50ID0gdGhpcy5wZW9wbGU7XG4gICAgdGhpcy5lbGVtZW50LnF1ZXJ5U2VsZWN0b3IoXCJwXCIpIS50ZXh0Q29udGVudCA9IHRoaXMucHJvamVjdC5kZXNjcmlwdGlvbjtcbiAgfVxuXG4gIEBhdXRvYmluZFxuICBkcmFnU3RhcnRIYW5kbGVyKGV2ZW50OiBEcmFnRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyKSB7XG4gICAgICBldmVudC5kYXRhVHJhbnNmZXIuc2V0RGF0YShcInRleHQvcGxhaW5cIiwgdGhpcy5wcm9qZWN0LmlkKTtcbiAgICAgIGV2ZW50LmRhdGFUcmFuc2Zlci5lZmZlY3RBbGxvd2VkID0gXCJtb3ZlXCI7XG4gICAgfVxuICB9XG5cbiAgZHJhZ0VuZEhhbmRsZXIoZXZlbnQ6IERyYWdFdmVudCk6IHZvaWQge1xuICAgIGNvbnNvbGUubG9nKGV2ZW50KTtcbiAgfVxufVxuIiwiZXhwb3J0IGZ1bmN0aW9uIGF1dG9iaW5kKFxuICB0YXJnZXQ6IGFueSxcbiAgcHJvcGVydHlLZXk6IHN0cmluZyxcbiAgZGVzY3JpcHRvcjogUHJvcGVydHlEZXNjcmlwdG9yXG4pIHtcbiAgcmV0dXJuIHtcbiAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgZ2V0KCkge1xuICAgICAgcmV0dXJuIGRlc2NyaXB0b3IudmFsdWUuYmluZCh0aGlzKTtcbiAgICB9LFxuICB9O1xufVxuIiwiZXhwb3J0IGVudW0gUHJvamVjdFN0YXR1cyB7XG4gIEFjdGl2ZSxcbiAgRmluaXNoZWQsXG59XG5cbmV4cG9ydCBjbGFzcyBQcm9qZWN0IHtcbiAgY29uc3RydWN0b3IoXG4gICAgcHVibGljIGlkOiBzdHJpbmcsXG4gICAgcHVibGljIHRpdGxlOiBzdHJpbmcsXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcsXG4gICAgcHVibGljIHBlb3BsZTogbnVtYmVyLFxuICAgIHB1YmxpYyBzdGF0dXM6IFByb2plY3RTdGF0dXNcbiAgKSB7fVxufVxuXG50eXBlIFByb2plY3RMaXN0ZW5lciA9IChwcm9qZWN0czogUHJvamVjdFtdKSA9PiB2b2lkO1xuXG5jbGFzcyBQcm9qZWN0U3RhdGUge1xuICBwcml2YXRlIGxpc3RlbmVyczogUHJvamVjdExpc3RlbmVyW10gPSBbXTtcbiAgcHJvamVjdHM6IFByb2plY3RbXSA9IFtdO1xuICBwcml2YXRlIHN0YXRpYyBpbnN0YW5jZTogUHJvamVjdFN0YXRlO1xuICBwcml2YXRlIGNvbnN0cnVjdG9yKCkge31cblxuICBzdGF0aWMgZ2V0SW5zdGFuY2UoKSB7XG4gICAgaWYgKCF0aGlzLmluc3RhbmNlKSB0aGlzLmluc3RhbmNlID0gbmV3IFByb2plY3RTdGF0ZSgpO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5zdGFuY2U7XG4gIH1cblxuICBsaXN0ZW5lcihmbjogUHJvamVjdExpc3RlbmVyKSB7XG4gICAgdGhpcy5saXN0ZW5lcnMucHVzaChmbik7XG4gIH1cblxuICBhZGQodGl0bGU6IHN0cmluZywgZGVzY3JpcHRpb246IHN0cmluZywgcGVvcGxlOiBudW1iZXIpIHtcbiAgICBjb25zdCBwcm9qZWN0ID0gbmV3IFByb2plY3QoXG4gICAgICBNYXRoLnJhbmRvbSgpLnRvU3RyaW5nKCksXG4gICAgICB0aXRsZSxcbiAgICAgIGRlc2NyaXB0aW9uLFxuICAgICAgcGVvcGxlLFxuICAgICAgUHJvamVjdFN0YXR1cy5BY3RpdmVcbiAgICApO1xuXG4gICAgdGhpcy5wcm9qZWN0cy5wdXNoKHByb2plY3QpO1xuXG4gICAgdGhpcy5saXN0ZW4oKTtcbiAgfVxuXG4gIHVwZGF0ZShwcm9qZWN0SWQ6IHN0cmluZywgc3RhdHVzOiBQcm9qZWN0U3RhdHVzKSB7XG4gICAgY29uc3QgcHJvamVjdCA9IHRoaXMucHJvamVjdHMuZmluZCgocHJvamVjdCkgPT4gcHJvamVjdC5pZCA9PT0gcHJvamVjdElkKTtcblxuICAgIGlmIChwcm9qZWN0ICYmIHByb2plY3Quc3RhdHVzICE9PSBzdGF0dXMpIHtcbiAgICAgIHByb2plY3Quc3RhdHVzID0gc3RhdHVzO1xuXG4gICAgICB0aGlzLmxpc3RlbigpO1xuICAgIH1cbiAgfVxuXG4gIGxpc3RlbigpIHtcbiAgICBmb3IgKGNvbnN0IGxpc3RlbmVyIG9mIHRoaXMubGlzdGVuZXJzKSB7XG4gICAgICBsaXN0ZW5lcih0aGlzLnByb2plY3RzLnNsaWNlKCkpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgY29uc3QgcHJvamVjdFN0YXRlID0gUHJvamVjdFN0YXRlLmdldEluc3RhbmNlKCk7XG4iLCJ0eXBlIFJ1bGUgPSBcInJlcXVpcmVkXCIgfCBcIm1heFwiIHwgXCJtaW5cIjtcblxudHlwZSBWYWxpZGF0YWJsZSA9IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3Ige1xuICBwcml2YXRlIGRhdGEgPSB7fSBhcyBWYWxpZGF0YWJsZTtcblxuICBwcml2YXRlIHJ1bGVzID0ge30gYXMgVmFsaWRhdGFibGU7XG5cbiAgcHVibGljIG1ha2UoZGF0YTogVmFsaWRhdGFibGUsIHJ1bGVzOiBWYWxpZGF0YWJsZSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICB0aGlzLnJ1bGVzID0gcnVsZXM7XG5cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuXG4gIHB1YmxpYyBmYWlscygpIHtcbiAgICBsZXQgZmFpbHMgPSBmYWxzZTtcblxuICAgIE9iamVjdC5rZXlzKHRoaXMuZGF0YSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICBpZiAodGhpcy5ydWxlc1trZXldKSB7XG4gICAgICAgIGNvbnN0IHJ1bGVzID0gdGhpcy5ydWxlc1trZXldLnNwbGl0KFwifFwiKSBhcyBSdWxlW107XG5cbiAgICAgICAgcnVsZXMuZm9yRWFjaCgocnVsZSkgPT4ge1xuICAgICAgICAgIGlmIChydWxlLmluY2x1ZGVzKFwiOlwiKSkge1xuICAgICAgICAgICAgY29uc3QgW3N0YXR1dGUsIHZhbHVlXSA9IHJ1bGUuc3BsaXQoXCI6XCIpIGFzIFtSdWxlLCBzdHJpbmddO1xuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHRoaXNbc3RhdHV0ZV0gJiZcbiAgICAgICAgICAgICAgdGhpc1tzdGF0dXRlXSh0aGlzLmRhdGFba2V5XSwgK3ZhbHVlKSA9PT0gZmFsc2VcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBmYWlscyA9IHRydWU7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdGhpc1tydWxlXSAmJlxuICAgICAgICAgICAgLyogQHRzLWlnbm9yZSAqL1xuICAgICAgICAgICAgdGhpc1tydWxlXSh0aGlzLmRhdGFba2V5XSkgPT09IGZhbHNlXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBmYWlscyA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBmYWlscztcbiAgfVxuXG4gIHByaXZhdGUgcmVxdWlyZWQodmFsdWU6IHN0cmluZykge1xuICAgIHJldHVybiB2YWx1ZS5sZW5ndGggPiAwO1xuICB9XG5cbiAgcHJpdmF0ZSBtaW4odmFsdWU6IHN0cmluZyB8IG51bWJlciwgbWluaW11bTogbnVtYmVyKSB7XG4gICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgcmV0dXJuIHZhbHVlLmxlbmd0aCA+PSBtaW5pbXVtO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdmFsdWUgPj0gbWluaW11bTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG1heCh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyLCBtYXhpbXVtOiBudW1iZXIpIHtcbiAgICBpZiAodHlwZW9mIHZhbHVlID09PSBcInN0cmluZ1wiKSB7XG4gICAgICByZXR1cm4gdmFsdWUubGVuZ3RoIDw9IG1heGltdW07XG4gICAgfSBlbHNlIHtcbiAgICAgIHJldHVybiB2YWx1ZSA8PSBtYXhpbXVtO1xuICAgIH1cbiAgfVxufSIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4iLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiaW1wb3J0IHsgUHJvamVjdENvbnRhaW5lciB9IGZyb20gXCIuL2NvbXBvbmVudHMvcHJvamVjdC1jb250YWluZXJcIjtcbmltcG9ydCB7IFByb2plY3RGb3JtIH0gZnJvbSBcIi4vY29tcG9uZW50cy9wcm9qZWN0LWZvcm1cIjtcblxubmV3IFByb2plY3RGb3JtKCk7XG5uZXcgUHJvamVjdENvbnRhaW5lcihcImFjdGl2ZVwiKTtcbm5ldyBQcm9qZWN0Q29udGFpbmVyKFwiZmluaXNoZWRcIik7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=