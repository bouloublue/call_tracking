import { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Chart6 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d');

    // Create gradients using PPC campaign colors
    const gradientStrokeGross = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStrokeGross.addColorStop(0, '#94A3B8');
    gradientStrokeGross.addColorStop(1, '#64748B');
    
    const gradientStrokeBillable = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStrokeBillable.addColorStop(0, '#0D9488');
    gradientStrokeBillable.addColorStop(1, '#0F766E');

    // Realistic PPC call data
    const callData = {
      gross: [42, 58, 75, 92, 105, 98, 85, 78, 65, 52, 38, 28],
      billable: [18, 25, 38, 52, 68, 62, 55, 48, 38, 30, 22, 15]
    };

    const myChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: ['8AM', '9AM', '10AM', '11AM', '12PM', '1PM', '2PM', '3PM', '4PM', '5PM', '6PM', '7PM'],
        datasets: [
          {
            label: 'Gross Calls',
            data: callData.gross,
            backgroundColor: gradientStrokeGross,
            hoverBackgroundColor: '#475569',
            borderRadius: 8,
            borderWidth: 0,
            barThickness: 14,
          },
          {
            label: 'Billable Calls',
            data: callData.billable,
            backgroundColor: gradientStrokeBillable,
            hoverBackgroundColor: '#0F766E',
            borderRadius: 8,
            borderWidth: 0,
            barThickness: 14,
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Call Volume by Hour (PPC Campaign)',
            color: '#0F172A',
            font: {
              size: 16,
              family: "'Inter', sans-serif",
              weight: 600
            },
            padding: {
              top: 0,
              bottom: 15
            }
          },
          legend: {
            position: 'top',
            labels: {
              color: '#475569',
              font: {
                size: 13,
                family: "'Inter', sans-serif"
              },
              padding: 20,
              usePointStyle: true,
              pointStyle: 'circle'
            }
          },
          tooltip: {
            backgroundColor: 'rgba(15, 23, 42, 0.95)',
            titleFont: {
              family: "'Inter', sans-serif",
              size: 14
            },
            bodyFont: {
              family: "'Inter', sans-serif",
              size: 13
            },
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function(context) {
                const datasetLabel = context.dataset.label;
                const value = context.raw;
                
                if (datasetLabel === 'Billable Calls') {
                  const grossValue = callData.gross[context.dataIndex];
                  const rate = Math.round((value / grossValue) * 100);
                  return `${datasetLabel}: ${value} calls | ${rate}% conversion`;
                }
                
                return `${datasetLabel}: ${value} calls`;
              }
            }
          },
          annotation: {
            annotations: {
              peakHourLine: {
                type: 'line',
                xMin: 4,
                xMax: 4,
                borderColor: '#EF4444',
                borderWidth: 2,
                borderDash: [5, 5],
                label: {
                  display: true,
                  content: 'Peak Conversion (65%)',
                  position: 'start',
                  backgroundColor: '#0D9488',
                  color: '#FFF',
                  font: {
                    size: 11,
                    family: "'Inter', sans-serif"
                  },
                  padding: 5,
                  borderRadius: 4
                }
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              display: false,
              drawBorder: false
            },
            ticks: {
              color: '#64748B',
              font: {
                size: 11,
                family: "'Inter', sans-serif"
              }
            },
            title: {
              display: true,
              text: 'Time of Day',
              color: '#475569',
              font: {
                size: 12,
                family: "'Inter', sans-serif",
                weight: 500
              },
              padding: {top: 10}
            }
          },
          y: {
            beginAtZero: true,
            grid: {
              color: 'rgba(226, 232, 240, 0.5)',
              drawBorder: false
            },
            ticks: {
              color: '#64748B',
              font: {
                size: 11,
                family: "'Inter', sans-serif"
              },
              padding: 8,
              callback: function(value) {
                return value;
              }
            },
            title: {
              display: true,
              text: 'Number of Calls',
              color: '#475569',
              font: {
                size: 12,
                family: "'Inter', sans-serif",
                weight: 500
              }
            }
          }
        },
        interaction: {
          mode: 'index',
          intersect: false
        },
        animation: {
          duration: 800,
          easing: 'easeOutQuart'
        }
      }
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div style={{ height: '400px', position: 'relative' }}>
      <canvas ref={canvasRef} width="600" height="400" />
    </div>
  );
};

export default Chart6;