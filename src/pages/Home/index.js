// src/pages/home.ts
import "./Home.scss";

import bgImgSrc from "../../assets/images/Home.png";
import imgSrc from "../../assets/images/LighImg.png";

import { Header } from "../../components/Header/index.js";
import { LineChart } from "../../components/LineChart/index.js";
import { Modal } from "../../components/Modal/index.js";
import { ProgressBar } from "../../components/ProgressBarChart/index.js";
import { Sidebar } from "../../components/Sidebar/index.js";
import { TotalPowerChart } from "../../components/TotalPowerChart/index.js";

export function Home(container) {
  class HomePage {
    rootEl;
    parent;
    isModalOpen = false;
    isSidebarOpen = false;

    constructor(parent) {
      this.parent = parent;
      this.rootEl = document.createElement("section");
      this.rootEl.classList.add("home-container");
      this.parent.appendChild(this.rootEl);
      this.render();
    }

    render() {
      // clear out
      this.rootEl.innerHTML = "";

      // — Sidebar
      const sidebarEl = Sidebar({
        isOpen: this.isSidebarOpen,
        onClose: () => {
          this.isSidebarOpen = false;
          this.render();
        },
      });
      this.rootEl.appendChild(sidebarEl);

      // — Modal & its children
      const modalChildren = [];
      if (this.isModalOpen) {
        // 1️⃣ First LineChart
        const chart1 = document.createElement("div");
        chart1.classList.add("home-chart-container");
        chart1.appendChild(
          LineChart({
            firstLineData: {
              label: "First Line",
              data: [8, 12, 10, 17, 21, 19],
            },
            secLineData: { label: "Sec Line", data: [10, 15, 9, 20, 25, 22] },
            xAxisLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            title: "Total Power",
          })
        );
        modalChildren.push(chart1);

        // 2️⃣ Charts + Progress bars
        const chartsWrap = document.createElement("div");
        chartsWrap.classList.add("home-charts-wrapper");

        // — TotalPowerChart
        chartsWrap.appendChild(
          TotalPowerChart({
            powerPercentage: 30,
            prevPercentage: -0.5,
            totalNum: 0,
          })
        );

        // — ProgressBar column
        const pbCol = document.createElement("div");
        pbCol.classList.add("home-progress-bar-wrapper");

        // Top part (Scheduled + 'Ligh')
        const topPart = document.createElement("div");
        topPart.classList.add("home-top-part-wrapper");
        topPart.innerHTML = `
          <div>
            <p>Scheduled</p>
            <img src="${imgSrc}" alt="img" />
          </div>
          <h1>Ligh</h1>
        `;
        pbCol.appendChild(topPart);

        // Two progress bars
        pbCol.appendChild(
          ProgressBar({
            percentage: 53,
            title: "visits",
            total: 1130,
            prevPercentage: -0.3,
          })
        );
        pbCol.appendChild(
          ProgressBar({
            percentage: 48,
            title: "Total Expenses",
            total: 1130,
            prevPercentage: -0.8,
          })
        );

        chartsWrap.appendChild(pbCol);
        modalChildren.push(chartsWrap);

        // 3️⃣ Two more LineCharts
        ["Total Energy", "Meters Consumption"].forEach((title) => {
          const c = document.createElement("div");
          c.classList.add("home-chart-container");
          c.appendChild(
            LineChart({
              firstLineData: {
                label: "First Line",
                data: [8, 12, 10, 17, 21, 19],
              },
              secLineData: { label: "Sec Line", data: [10, 15, 9, 20, 25, 22] },
              xAxisLabels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
              title,
            })
          );
          modalChildren.push(c);
        });
      }

      const modalEl = Modal({
        floorNum: 3,
        isOpen: this.isModalOpen,
        onClose: () => {
          this.isModalOpen = false;
          this.render();
        },
        children: modalChildren,
      });
      this.rootEl.appendChild(modalEl);

      // — Background image
      const bg = document.createElement("img");
      bg.classList.add("home-bg-img");
      bg.src = bgImgSrc;
      bg.alt = "Home Image";
      this.rootEl.appendChild(bg);

      // — Header
      const headerEl = Header({
        onAnalyticsClick: () => {
          this.isModalOpen = true;
          this.render();
        },
        onMenuClick: () => {
          this.isSidebarOpen = !this.isSidebarOpen;
          this.render();
        },
      });
      this.rootEl.appendChild(headerEl);
    }
  }

  new HomePage(container);
}
