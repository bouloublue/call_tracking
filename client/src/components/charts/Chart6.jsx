import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Chart6 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    const gradientStroke3 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke3.addColorStop(0, '#42e695');
    gradientStroke3.addColorStop(1, '#3bb2b8');

    const gradientStroke4 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke4.addColorStop(0, '#7f00ff');
    gradientStroke4.addColorStop(0.5, '#e100ff');

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: [1, 2, 3, 4, 5, 6, 7, 8],
        datasets: [
          {
            label: 'Laptops',
            data: [40, 30, 60, 35, 60, 25, 50, 40],
            borderColor: gradientStroke3,
            backgroundColor: gradientStroke3,
            hoverBackgroundColor: gradientStroke3,
            pointRadius: 0,
            borderRadius: 20,
            fill: false,
            borderWidth: 1
          },
          {
            label: 'Mobiles',
            data: [50, 60, 40, 70, 35, 75, 30, 20],
            borderColor: gradientStroke4,
            backgroundColor: gradientStroke4,
            hoverBackgroundColor: gradientStroke4,
            pointRadius: 0,
            borderRadius: 20,
            fill: false,
            borderWidth: 1
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        barPercentage: 0.5,
        categoryPercentage: 0.8,
        plugins: {
          legend: {
            display: true,
            position: 'bottom'
          }
        },
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    return () => {
      myChart.destroy(); // cleanup on unmount
    };
  }, []);

  return (
    <div style={{ height: '400px' }}>
      <canvas ref={canvasRef} width="600" height="400" />
    </div>
  );
};

export default Chart6;
