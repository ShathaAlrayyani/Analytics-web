import { Home } from './pages/Home';
// import { TestPage } from './pages/test-page.js'; // when ready

type RouteFn = (container: HTMLElement) => void;

const routes: Record<string, RouteFn> = {
  '/'      : Home,
  ''       : Home,  // allow “#/” and “#”
  // '/anotherPage': TestPage,
};

export function App(root: HTMLElement) {
  const appSection = document.createElement('section');
  appSection.classList.add('app');  // corresponds to styles.app
  root.appendChild(appSection);

  function render() {
    const hash = window.location.hash.replace('#', '') || '/';
    const renderPage = routes[hash] || Home;
    appSection.innerHTML = '';
    renderPage(appSection);
  }

  window.addEventListener('hashchange', render);
  render();
}
