/* =========================================================
   CHARTS.JS — Chart.js asosidagi qayta ishlatiladigan grafiklar
   ========================================================= */

const CHART_COLORS = {
  indigo: '#6366F1',
  purple: '#8B5CF6',
  blue: '#3B82F6',
  success: '#22C55E',
  warning: '#F59E0B',
  grid: '#EEF0FA'
};

/**
 * Chiziqli trend grafigi (masalan, oylik test natijalari)
 */
function renderLineChart(canvasId, labels, data, label = "Natija"){
  const ctx = document.getElementById(canvasId);
  if(!ctx) return;
  const gradient = ctx.getContext('2d').createLinearGradient(0,0,0,220);
  gradient.addColorStop(0, 'rgba(99,102,241,0.25)');
  gradient.addColorStop(1, 'rgba(99,102,241,0)');

  new Chart(ctx, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label, data,
        borderColor: CHART_COLORS.indigo,
        backgroundColor: gradient,
        borderWidth: 3,
        pointBackgroundColor: '#fff',
        pointBorderColor: CHART_COLORS.indigo,
        pointBorderWidth: 2,
        pointRadius: 5,
        tension: 0.4,
        fill: true
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { min: 0, max: 100, grid: { color: CHART_COLORS.grid }, ticks: { stepSize: 25 } },
        x: { grid: { display: false } }
      }
    }
  });
}

/**
 * Ustunli taqqoslash grafigi (masalan, guruhlar bo'yicha o'rtacha ball)
 */
function renderBarChart(canvasId, labels, data, label = "Qiymat"){
  const ctx = document.getElementById(canvasId);
  if(!ctx) return;
  new Chart(ctx, {
    type: 'bar',
    data: {
      labels,
      datasets: [{
        label, data,
        backgroundColor: [CHART_COLORS.indigo, CHART_COLORS.purple, CHART_COLORS.blue, '#A78BFA', '#818CF8'],
        borderRadius: 8,
        maxBarThickness: 40
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { display: false } },
      scales: {
        y: { beginAtZero: true, grid: { color: CHART_COLORS.grid } },
        x: { grid: { display: false } }
      }
    }
  });
}

/**
 * Donut grafigi (masalan, davomat taqsimoti: kelgan/kelmagan/kechikkan)
 */
function renderDonutChart(canvasId, labels, data){
  const ctx = document.getElementById(canvasId);
  if(!ctx) return;
  new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels,
      datasets: [{
        data,
        backgroundColor: [CHART_COLORS.success, CHART_COLORS.warning, '#EF4444'],
        borderWidth: 0,
        cutout: '72%'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: { legend: { position: 'bottom', labels: { boxWidth: 10, font: { size: 11 } } } }
    }
  });
}
