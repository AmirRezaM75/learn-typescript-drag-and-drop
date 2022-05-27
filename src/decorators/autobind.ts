export function autobind(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  return {
    configurable: true,
    get() {
      return descriptor.value.bind(this);
    },
  };
}
