type NonFunctionPropertyNames<T> = {
  // eslint-disable-next-line @typescript-eslint/ban-types
  [K in keyof T]: T[K] extends Function ? never : K;
}[keyof T];

export abstract class ConstructableEntity<
  T = ConstructableEntity<Record<string, unknown>>
> {
  constructor(dto?: Pick<T, NonFunctionPropertyNames<T>>) {
    if (dto) {
      Object.assign(this, dto);
    }
  }
}
