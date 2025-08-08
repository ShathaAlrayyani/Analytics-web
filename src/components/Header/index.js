// src/components/Header.js
import menuIconUrl from '../../assets/icons/Menu.svg?url';
import logoUrl from '../../assets/images/Logo.png';
import analyticsIconUrl from '../../assets/icons/Analytics.svg?url';

import './Header.scss'

export function Header({ onAnalyticsClick, onMenuClick }) {
  // <header class="header-wrapper">
  const headerEl = document.createElement('header');
  headerEl.classList.add('header-wrapper');

  // Left container
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('header-container');
  headerEl.appendChild(leftContainer);

  // Menu icon
  const menuImg = document.createElement('img');
  menuImg.src = menuIconUrl;
  menuImg.alt = 'Menu';
  menuImg.addEventListener('click', onMenuClick);
  leftContainer.appendChild(menuImg);

  // Logo
  const logoImg = document.createElement('img');
  logoImg.src = logoUrl;
  logoImg.alt = 'Logo';
  leftContainer.appendChild(logoImg);

  // Brand text
  const brandText = document.createElement('p');
  // preserve the line-break
  brandText.innerHTML = `Workstation<br/>by Innowave`;
  leftContainer.appendChild(brandText);

  // Right container (Analytics)
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('header-container');
  rightContainer.addEventListener('click', onAnalyticsClick);
  headerEl.appendChild(rightContainer);

  const analyticsImg = document.createElement('img');
  analyticsImg.src = analyticsIconUrl;
  analyticsImg.alt = 'Analytics';
  rightContainer.appendChild(analyticsImg);

  const analyticsText = document.createElement('p');
  analyticsText.innerText = 'Analytics';
  rightContainer.appendChild(analyticsText);

  return headerEl;
}
