type Rule = "required" | "max" | "min";

type Validatable = Record<string, string>;

export class Validator {
  private data = {} as Validatable;

  private rules = {} as Validatable;

  public make(data: Validatable, rules: Validatable) {
    this.data = data;

    this.rules = rules;

    return this;
  }

  public fails() {
    let fails = false;

    Object.keys(this.data).forEach((key) => {
      if (this.rules[key]) {
        const rules = this.rules[key].split("|") as Rule[];

        rules.forEach((rule) => {
          if (rule.includes(":")) {
            const [statute, value] = rule.split(":") as [Rule, string];

            if (
              this[statute] &&
              this[statute](this.data[key], +value) === false
            ) {
              fails = true;
            }
          }

          if (
            this[rule] &&
            /* @ts-ignore */
            this[rule](this.data[key]) === false
          ) {
            fails = true;
          }
        });
      }
    });

    return fails;
  }

  private required(value: string) {
    return value.length > 0;
  }

  private min(value: string | number, minimum: number) {
    if (typeof value === "string") {
      return value.length >= minimum;
    } else {
      return value >= minimum;
    }
  }

  private max(value: string | number, maximum: number) {
    if (typeof value === "string") {
      return value.length <= maximum;
    } else {
      return value <= maximum;
    }
  }
}