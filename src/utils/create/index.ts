import { createBEM, BEM } from './bem';
import { createComponent } from './component';

type CreateNamespaceReturn = [
  ReturnType<typeof createComponent>,
  BEM,
];

export function createNamespace(name: string): CreateNamespaceReturn {
  name = 'z-' + name;
  return [createComponent(name), createBEM(name)];
}
