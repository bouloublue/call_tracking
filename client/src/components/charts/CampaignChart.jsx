import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import axisoInstance from "../../utils/axiosInstance";
import { toast } from "react-toastify";
const API_BASE_URL = import.meta.env.VITE_API_URL;
import "react-toastify/dist/ReactToastify.css";

const BuyerChart = ({ campaignId }) => {
  const canvasRef = useRef(null);
  const [callData, setCallData] = useState({
    totalCalls: 0,
    billable: 0,
    connected: 0,
    droppedCalls: 0,
    totalBilledAmount: 0,
    conversionRate: 0,
  });

  useEffect(() => {
    const ctx = canvasRef.current.getContext("2d");

    const fetchCallStats = async () => {
      try {
        const res = await axisoInstance.get(
          `${API_BASE_URL}/api/call/${campaignId}/stats`
        );
        const callStats = res.data.stats;

        const updatedCallData = {
          totalCalls: callStats?.totalCalls || 0,
          connected: callStats?.connected || 0,
          billable: callStats?.converted || 0,
          droppedCalls: callStats?.droppedCalls || 0,
          totalBilledAmount: callStats?.totalBilledAmount || 0,
          conversionRate: callStats?.conversionRate || "0.00%",
        };

        setCallData(updatedCallData);
      } catch (error) {
        console.error("Error fetching call logs:", error);
        toast.error("Error fetching call logs");
      }
    };

    fetchCallStats();

    const colors = {
      billable: "#0D9488",
      dropped: "#EF4444",
      totalCalls: "#3B82F6",
      connected: "#8B5CF6",
    };

    const hoverColors = {
      billable: "#0F766E",
      dropped: "#DC2626",
      totalCalls: "#2563EB",
      connected: "#7C3AED",
    };

    const centerTextPlugin = {
      id: "doughnutCenterText",
      beforeDraw: (chart) => {
        const { width, height, ctx } = chart;
        ctx.save();

        const centerX = width / 2;
        const centerY = height / 2;

        const percentage = parseFloat(callData.conversionRate);
        const mainText = `${percentage}%`;
        const labelText = "Billable Rate";

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
          mainAscent + mainDescent + gap + labelAscent + labelDescent;
        const startY = centerY - totalHeight / 2;

        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.fillStyle = "#F8FAFC";
        ctx.fill();
        ctx.closePath();

        ctx.beginPath();
        ctx.arc(centerX, centerY, 70, 0, Math.PI * 2);
        ctx.strokeStyle = "#E2E8F0";
        ctx.lineWidth = 2;
        ctx.stroke();
        ctx.closePath();

        ctx.font = "bold 28px 'Inter', sans-serif";
        ctx.fillStyle = "#0D9488";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(mainText, centerX, startY);

        ctx.font = "500 14px 'Inter', sans-serif";
        ctx.fillStyle = "#64748B";
        ctx.fillText(
          labelText,
          centerX,
          startY + mainAscent + mainDescent + gap
        );

        ctx.restore();
      },
    };

    const myChart = new Chart(ctx, {
      type: "doughnut",
      data: {
        labels: ["Billable", "Dropped", "Total Calls", "Connected"],
        datasets: [
          {
            data: [
              callData.billable,
              callData.droppedCalls,
              callData.totalCalls,
              callData.connected,
            ],
            backgroundColor: [
              colors.billable,
              colors.dropped,
              colors.totalCalls,
              colors.connected,
            ],
            hoverBackgroundColor: [
              hoverColors.billable,
              hoverColors.dropped,
              hoverColors.totalCalls,
              hoverColors.connected,
            ],

            borderWidth: 0,
            borderRadius: 6,
            spacing: 4,
            hoverOffset: 12,
          },
        ],
      },
      options: {
        maintainAspectRatio: false,
        responsive: true,
        cutout: "65%",
        layout: { padding: 0 },
        plugins: {
          legend: { display: false },
          title: { display: false },
          tooltip: {
            backgroundColor: "rgba(15, 23, 42, 0.95)",
            titleFont: { family: "'Inter', sans-serif", size: 14 },
            bodyFont: { family: "'Inter', sans-serif", size: 13 },
            padding: 12,
            cornerRadius: 8,
            displayColors: true,
            callbacks: {
              label: function (context) {
                const label = context.label || "";
                const value = context.raw || 0;
                const percentage = Math.round(
                  (value / callData.totalCalls) * 100
                );
                return `${label}: ${value} calls (${percentage}%)`;
              },
            },
          },
        },
        animation: {
          animateRotate: true,
          animateScale: true,
          duration: 800,
          easing: "easeOutQuart",
        },
      },
      plugins: [centerTextPlugin],
    });

    return () => {
      myChart.destroy();
    };
  }, [
    campaignId,
    callData.totalCalls,
    callData.billable,
    callData.droppedCalls,
    callData.totalCalls,
    callData.connected,
  ]);

  return (
    <div
      style={{
        height: "400px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div
        style={{
          fontSize: "16px",
          fontWeight: 600,
          fontFamily: "Inter, sans-serif",
          color: "#0F172A",
          marginBottom: "4px",
        }}
      >
        {/* PPC Call Distribution */}
      </div>

      <div style={{ flex: 1, width: "100%", position: "relative" }}>
        <div
          style={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <canvas ref={canvasRef} width="400" height="400" />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          columnGap: "32px",
          rowGap: "8px",
          paddingTop: "12px",
          maxWidth: "360px",
          width: "100%",
          justifyItems: "start",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#0D9488",
              borderRadius: "50%",
            }}
          ></span>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
              color: "#475569",
            }}
          >
            Billable: {callData.billable} (
            {Math.round((callData.billable / callData.totalCalls) * 100) || 0}%)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#EF4444",
              borderRadius: "50%",
            }}
          ></span>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
              color: "#475569",
            }}
          >
            Dropped: {callData.droppedCalls} (
            {Math.round((callData.droppedCalls / callData.totalCalls) * 100) ||
              0}
            %)
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#3B82F6", 
              borderRadius: "50%",
            }}
          ></span>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
              color: "#475569",
            }}
          >
            Total Calls: {callData.totalCalls}
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          <span
            style={{
              width: "12px",
              height: "12px",
              backgroundColor: "#8B5CF6", 
              borderRadius: "50%",
            }}
          ></span>
          <span
            style={{
              fontSize: "13px",
              fontFamily: "Inter, sans-serif",
              color: "#475569",
            }}
          >
            Connected: {callData.connected} (
            {Math.round((callData.connected / callData.totalCalls) * 100) || 0}%
            )
          </span>
        </div>
      </div>
    </div>
  );
};

export default BuyerChart;
