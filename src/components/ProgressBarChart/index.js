// src/components/ProgressBar.js
import arrowUrl from "../../assets/icons/ArrowFall.svg?url";
import "./ProgressBarChart.scss";

/**
 * Creates a horizontal progress bar with a title, current % bar,
 * and bottom stats including previous % with an arrow icon.
 */
export const ProgressBar = ({ percentage, prevPercentage, title, total }) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("progress-bar-wrapper");

  // title
  const titleEl = document.createElement("p");
  titleEl.classList.add("progress-title");
  titleEl.textContent = title;
  wrapper.appendChild(titleEl);

  // bar area
  const chartWrap = document.createElement("div");
  chartWrap.classList.add("chart-wrapper");
  wrapper.appendChild(chartWrap);

  const container = document.createElement("div");
  container.classList.add("progress-container");
  chartWrap.appendChild(container);

  const bar = document.createElement("div");
  bar.classList.add("progress-bar");
  bar.style.width = `${percentage}%`;
  container.appendChild(bar);

  // bottom stats
  const bottom = document.createElement("div");
  bottom.classList.add("progress-bottom");

  const totalEl = document.createElement("p");
  totalEl.textContent = String(total);
  bottom.appendChild(totalEl);

  const prevEl = document.createElement("p");
  prevEl.textContent = `${prevPercentage}% `;

  const arrowImg = document.createElement("img");
  arrowImg.src = arrowUrl;
  arrowImg.alt = "Trend Arrow";
  prevEl.appendChild(arrowImg);

  bottom.appendChild(prevEl);
  wrapper.appendChild(bottom);

  return wrapper;
};
