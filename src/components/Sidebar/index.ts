// src/components/sidebar.ts
import './Sidebar.scss';

export interface SidebarProps {
  isOpen:  boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps): HTMLElement {
  // 1) container
  const nav = document.createElement('nav');
  nav.id = 'sidebarElement';
  nav.classList.add('sidebar');
  if (isOpen) nav.classList.add('openSideBar');

  // 2) inner markup (you can inline your HTML or build via DOM API)
  nav.innerHTML = `
    <div class="closeSideBar">
      <img src="/src/assets/icons/Close.svg" alt="Close" id="closeSidebarBtn" />
    </div>
    <div class="sectionContainer">
      <h1>Dashboards</h1>
      <ul>
        <li>
          <img src="/src/assets/icons/Overview.svg" alt="Overview" /> Overview
        </li>
        <li>
          <button class="dropdownToggle" data-target="dropdownProjects">
            <img src="/src/assets/icons/ArrowLineRight.svg" />
            <img src="/src/assets/icons/Projects.svg" />
            <p>Projects</p>
          </button>
          <ul class="dropdown" id="dropdownProjects">
            <li><a href="/profile/overview">Overview</a></li>
            <li><a href="/profile/settings">Settings</a></li>
            <li><a href="/profile/security">Security</a></li>
          </ul>
        </li>
      </ul>
    </div>
    <div class="sectionContainer">
      <h1>Pages</h1>
      <ul>
        ${dropdownItem('User Profile', 'UserProfile')}
        ${dropdownItem('Accounts',     'Account')}
        ${dropdownItem('Corporate',    'Corporate')}
      </ul>
    </div>
  `;

  // 3) events
  // close button
  nav.querySelector<HTMLElement>('#closeSidebarBtn')
     ?.addEventListener('click', () => onClose());

  // dropdown toggles
  nav.querySelectorAll<HTMLElement>('.dropdownToggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const target = toggle.dataset.target!;
      const dd = nav.querySelector<HTMLElement>(`#${target}`);
      if (dd) dd.classList.toggle('show');
    });
  });

  // click-away to close
  document.addEventListener('click', (e) => {
    if (isOpen && !nav.contains(e.target as Node)) {
      onClose();
    }
  });

  return nav;
}

function dropdownItem(label: string, iconName: string) {
  const id = 'dropdown' + label.replace(/\s+/g, '');
  return `
    <li>
      <button class="dropdownToggle" data-target="${id}">
        <img src="/src/assets/icons/ArrowLineRight.svg" />
        <img src="/src/assets/icons/${iconName}.svg" />
        <p>${label}</p>
      </button>
      <ul class="dropdown" id="${id}">
        <li><a href="/profile/overview">Overview</a></li>
        <li><a href="/profile/settings">Settings</a></li>
        <li><a href="/profile/security">Security</a></li>
      </ul>
    </li>
  `;
}
