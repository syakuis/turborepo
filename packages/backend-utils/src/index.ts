// node only
// export * from './constant.js';

console.log('Hello, World! - Backend Utils Package');

export function hello(name: string = 'World'): string {
  return `Hello, ${name}!`;
}

export function getCurrentTime(): string {
  return new Date().toISOString();
}
