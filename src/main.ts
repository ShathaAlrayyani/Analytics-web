import { App } from './app.ts';

const root = document.getElementById('root');
if (!root) {
  throw new Error('❗ No element with id="root" found');
}

App(root);
