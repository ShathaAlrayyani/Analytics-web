// src/components/line-chart.ts
import {
  Chart,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler,
} from 'chart.js';

import './LineChart.scss';

// register Chart.js components once
Chart.register(
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
  Filler
);

export interface LineChartData {
  label: string;
  data: number[];
}
export interface LineChartProps {
  firstLineData: LineChartData;
  secLineData:   LineChartData;
  title:         string;
  xAxisLabels:   string[];
}

/**
 * Creates a line‐chart wrapped in a div.
 */
export function LineChart({
  firstLineData,
  secLineData,
  title,
  xAxisLabels,
}: LineChartProps): HTMLElement {
  // container
  const container = document.createElement('div');
  container.classList.add('line-chart-container');

  // title
  const titleEl = document.createElement('p');
  titleEl.classList.add('chart-title');
  titleEl.textContent = title;
  container.appendChild(titleEl);

  // canvas for Chart.js
  const canvas = document.createElement('canvas');
  container.appendChild(canvas);

  // build data & options
  const data = {
    labels: xAxisLabels,
    datasets: [
      {
        label:     firstLineData.label,
        data:      firstLineData.data,
        borderColor: 'rgb(174, 199, 237)',
        tension:     0.4,
        pointRadius: 0,
        borderWidth: 1,
        borderDash: [3, 3],
        fill:       true,
      },
      {
        label:       secLineData.label,
        data:        secLineData.data,
        borderColor: 'rgb(255, 127, 0)',
        tension:     0.4,
        borderWidth: 2,
        pointRadius: 0,
        fill:        false,
        showLine:    true,
      },
    ],
  };
  const options = {
    responsive: true,
    plugins: {
      legend:  { display: false },
      tooltip: { enabled: true  },
    },
    scales: {
      y: { beginAtZero: true },
    },
  };

  // instantiate Chart
  new Chart(canvas, {
    type:    'line',
    data,
    options,
  });

  return container;
}
