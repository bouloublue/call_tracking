import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Chart16 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const callData = {
      billable: 142,
      missed: 32,
      spam: 25,
      shortDuration: 18
    };

    const totalCalls = Object.values(callData).reduce((sum, val) => sum + val, 0);

    const colors = {
      billable: '#0D9488',
      missed: '#EF4444',
      spam: '#8B5CF6',
      shortDuration: '#F59E0B'
    };

    const hoverColors = {
      billable: '#0F766E',
      missed: '#DC2626',
      spam: '#7C3AED',
      shortDuration: '#D97706'
    };

    const centerTextPlugin = {
      id: 'doughnutCenterText',
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.save();

        const centerX = width / 2;
        const centerY = height / 2;

        const percentage = Math.round((callData.billable / totalCalls) * 100);
        const mainText = `${percentage}%`;
        const labelText = 'Billable Rate';

        ctx.font = "bold 28px 'Inter', sans-serif";
        const mainMetrics = ctx.measureText(mainText);
        const mainAscent = mainMetrics.actualBoundingBoxAscent;
        const mainDescent = mainMetrics.actualBoundingBoxDescent;

        ctx.font = "500 14px 'Inter', sans-serif";
        const labelMetrics = ctx.measureText(labelText);
        const labelAscent = labelMetrics.actualBoundingBoxAscent;
        const labelDescent = labelMetrics.actualBoundingBoxDescent;

        const gap = 6;
        const totalHeight =
          mainAscent + mainDescent +
          gap +
          labelAscent + labelDescent;

        const startY = centerY - totalHeight / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fillStyle = '#F8FAFC';
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.strokeStyle = '#E2E8F0';
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        ctx.font = "bold 28px 'Inter', sans-serif";
        ctx.fillStyle = '#0D9488';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'top';
        ctx.fillText(mainText, centerX, startY);

        ctx.font = "500 14px 'Inter', sans-serif";
        ctx.fillStyle = '#64748B';
        ctx.fillText(labelText, centerX, startY + mainAscent + mainDescent + gap);

        ctx.restore();
      }
    };

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Billable", "Missed", "Spam/Fraud", "Short Duration"],
        datasets: [
          {
            data: [
              callData.billable,
              callData.missed,
              callData.spam,
              callData.shortDuration
            ],
            backgroundColor: [
              colors.billable,
              colors.missed,
              colors.spam,
              colors.shortDuration
            ],
            hoverBackgroundColor: [
              hoverColors.billable,
              hoverColors.missed,
              hoverColors.spam,
              hoverColors.shortDuration
            ],
            borderWidth: 0,
            borderRadius: 6,
            spacing: 4,
            hoverOffset: 12
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        cutout: '65%',
        layout: {
          padding: 0
        },
        plugins: {
          legend: { display: false },
          title: { display: false },
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
              label: function (context) {
                const label = context.label || '';
                const value = context.raw || 0;
                const percentage = Math.round((value / totalCalls) * 100);
                return `${label}: ${value} calls (${percentage}%)`;
              }
            }
          }
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 800,
          easing: 'easeOutQuart'
        }
      },
      plugins: [centerTextPlugin]
    });

    return () => {
      myChart.destroy();
    };
  }, []);

  return (
    <div style={{ height: '400px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between' }}>
      {/* Title */}
      <div style={{ fontSize: '16px', fontWeight: 600, fontFamily: 'Inter, sans-serif', color: '#0F172A', marginBottom: '4px' }}>
        PPC Call Distribution
      </div>

      {/* Chart Canvas */}
      <div style={{ flex: 1, width: '100%', position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <canvas ref={canvasRef} width="400" height="400" />
        </div>
      </div>

      {/* Legend in Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '32px',
          rowGap: '8px',
          paddingTop: '12px',
          maxWidth: '360px',
          width: '100%',
          justifyItems: 'start'
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: '#0D9488', borderRadius: '50%' }}></span>
          <span style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#475569' }}>
            Billable: 142 (65%)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: '#EF4444', borderRadius: '50%' }}></span>
          <span style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#475569' }}>
            Missed: 32 (15%)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: '#8B5CF6', borderRadius: '50%' }}></span>
          <span style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#475569' }}>
            Spam/Fraud: 25 (12%)
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: '12px', height: '12px', backgroundColor: '#F59E0B', borderRadius: '50%' }}></span>
          <span style={{ fontSize: '13px', fontFamily: 'Inter, sans-serif', color: '#475569' }}>
            Short Duration: 18 (8%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default Chart16;
