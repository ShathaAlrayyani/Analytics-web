// src/components/TotalPowerChart.js

import powerIconUrl from "../../assets/icons/Power.svg?url";
import lineIconUrl from "../../assets/icons/Line.svg?url";
import arrowFallIconUrl from "../../assets/icons/ArrowFall.svg?url";

import "./TotalPowerChart.scss";

/**
 * Returns an HTMLElement rendering a gauge‐like “total power” chart.
 */
export const TotalPowerChart = ({
  powerPercentage,
  prevPercentage,
  title = "Total Power",
  totalNum,
}) => {
  // compute rotation: -155° → +25° as percentage goes 0→100
  const rotationDeg = -155 + (powerPercentage / 100) * 180;

  // container
  const container = document.createElement("div");
  container.classList.add("total-power-chart-container");

  // title
  const titleEl = document.createElement("p");
  titleEl.textContent = title;
  container.appendChild(titleEl);

  // chart wrapper
  const chartWrapper = document.createElement("div");
  chartWrapper.classList.add("total-power-chart-chart-wrapper");
  container.appendChild(chartWrapper);

  // — power icon + unit
  const powerIconWrapper = document.createElement("div");
  powerIconWrapper.classList.add("total-power-chart-power-icon-wrapper");
  const powerImg = document.createElement("img");
  powerImg.src = powerIconUrl;
  powerImg.alt = "Power Icon";
  powerIconWrapper.appendChild(powerImg);
  const unitP = document.createElement("p");
  unitP.textContent = "kWh/month";
  powerIconWrapper.appendChild(unitP);
  chartWrapper.appendChild(powerIconWrapper);

  // — rotating line
  const lineIconWrapper = document.createElement("div");
  lineIconWrapper.classList.add("total-power-chart-line-icon-wrapper");
  lineIconWrapper.style.transform = `rotate(${rotationDeg}deg)`;
  lineIconWrapper.style.transformOrigin = "left center";
  const lineImg = document.createElement("img");
  lineImg.src = lineIconUrl;
  lineImg.alt = "Gauge Line";
  lineIconWrapper.appendChild(lineImg);
  chartWrapper.appendChild(lineIconWrapper);

  // bottom stats
  const bottomWrapper = document.createElement("div");
  bottomWrapper.classList.add("total-power-chart-bottom-part-wrapper");
  // label “Total”
  const totalLabel = document.createElement("p");
  totalLabel.textContent = "Total";
  bottomWrapper.appendChild(totalLabel);

  // value + delta
  const totalWrapper = document.createElement("div");
  totalWrapper.classList.add("total-power-chart-total-wrapper");
  const valueH1 = document.createElement("h1");
  valueH1.textContent = String(totalNum);
  totalWrapper.appendChild(valueH1);
  const deltaP = document.createElement("p");
  deltaP.textContent = `${prevPercentage}%`;
  const arrowImg = document.createElement("img");
  arrowImg.src = arrowFallIconUrl;
  arrowImg.alt = "Trend Arrow";
  deltaP.appendChild(arrowImg);
  totalWrapper.appendChild(deltaP);

  bottomWrapper.appendChild(totalWrapper);
  container.appendChild(bottomWrapper);

  return container;
};
