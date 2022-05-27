export function autobind(target, propertyKey, descriptor) {
    return {
        configurable: true,
        get() {
            return descriptor.value.bind(this);
        },
    };
}
