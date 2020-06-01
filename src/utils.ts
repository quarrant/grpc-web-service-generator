export function getObjectKeys<T>(target: T) {
  return Object.keys(target) as (keyof T)[];
}

export function isBoolean<T>(target: T) {
  return typeof target === 'boolean';
}

export function isStringArray(array: any): array is string[] {
  return Array.isArray(array) && array.every((item) => typeof item === 'string');
}
