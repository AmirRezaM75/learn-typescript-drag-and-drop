export class Validator {
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
