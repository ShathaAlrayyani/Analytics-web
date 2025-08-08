// src/components/Sidebar.js

import "./Sidebar.scss";

export const Sidebar = ({ isOpen, onClose }) => {
  const nav = document.createElement("nav");
  nav.id = "sidebarElement";
  nav.classList.add("sidebar");

  // open/close class
  if (isOpen) {
    nav.classList.add("openSideBar");
  }

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
        ${dropdownItem("User Profile", "UserProfile", [
          { text: "Profile Info", href: "/user/profile" },
          { text: "Preferences", href: "/user/preferences" },
          { text: "Privacy Settings", href: "/user/privacy" },
        ])}
        ${dropdownItem("Accounts", "Account", [
          { text: "Billing", href: "/account/billing" },
          { text: "Subscriptions", href: "/account/subscriptions" },
          { text: "Invoices", href: "/account/invoices" },
        ])}
        ${dropdownItem("Corporate", "Corporate", [
          { text: "Company Info", href: "/corporate/info" },
          { text: "Teams", href: "/corporate/teams" },
          { text: "Access Management", href: "/corporate/access" },
        ])}
      </ul>
    </div>
  `;

  // close button
  nav
    .querySelector("#closeSidebarBtn")
    ?.addEventListener("click", () => onClose());

  // dropdowns
  nav.querySelectorAll(".dropdownToggle").forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const targetId = toggle.dataset.target;
      const dropdown = nav.querySelector(`#${targetId}`);
      dropdown?.classList.toggle("show");
    });
  });

  // click-away
  setTimeout(() => {
    const handleClick = (e) => {
      if (isOpen && !nav.contains(e.target)) {
        onClose();
        document.removeEventListener("click", handleClick);
      }
    };
    document.addEventListener("click", handleClick);
  }, 0);

  return nav;
};

const dropdownItem = (label, iconName, links) => {
  const id = "dropdown" + label.replace(/\s+/g, "");

  const linksHTML = links
    .map((link) => `<li><a href="${link.href}">${link.text}</a></li>`)
    .join("");

  return `
    <li>
      <button class="dropdownToggle" data-target="${id}">
        <img src="/src/assets/icons/ArrowLineRight.svg" />
        <img src="/src/assets/icons/${iconName}.svg" />
        <p>${label}</p>
      </button>
      <ul class="dropdown" id="${id}">
        ${linksHTML}
      </ul>
    </li>
  `;
};
