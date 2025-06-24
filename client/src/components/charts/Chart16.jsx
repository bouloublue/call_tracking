import { useEffect, useRef } from "react";
import Chart from "chart.js/auto";

const Chart16 = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    // Gradients
    const gradientStroke5 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke5.addColorStop(0, "#7f00ff");
    gradientStroke5.addColorStop(1, "#e100ff");

    const gradientStroke6 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke6.addColorStop(0, "#fc4a1a");
    gradientStroke6.addColorStop(1, "#f7b733");

    const gradientStroke7 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke7.addColorStop(0, "#283c86");
    gradientStroke7.addColorStop(1, "#45a247");

    const gradientStroke8 = ctx.createLinearGradient(0, 0, 0, 300);
    gradientStroke8.addColorStop(0, "#ff7e5f");
    gradientStroke8.addColorStop(1, "#feb47b");

    // Chart
    const myChart = new Chart(ctx, {
      type: "pie",
      data: {
        labels: ["dials", "no_answers", "pickups", "outcomes"],
        datasets: [
          {
            backgroundColor: [
              gradientStroke5,
              gradientStroke6,
              gradientStroke7,
              gradientStroke8,
            ],
            hoverBackgroundColor: [
              gradientStroke5,
              gradientStroke6,
              gradientStroke7,
              gradientStroke8,
            ],
            data: [100, 10, 20, 20],
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false,
            position: "bottom",
          },
        },
      },
    });

    return () => {
      myChart.destroy(); // Cleanup on component unmount
    };
  }, []);

  return (
    <div style={{ height: "400px", width: "100%" }}>
      <canvas ref={canvasRef} width="400" height="400" />
    </div>
  );
};

export default Chart16;
