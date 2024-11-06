import { Bar } from "react-chartjs-2";
export const BarChart = ({ chartData }) => {
  return (
    <div className="chart-container">
      {/* <h2 style={{ textAlign: "center" }}>Bar Chart</h2> */}
      <Bar
        data={chartData}
        options={{
          plugins: {
            title: {
              display: true,
              text: "User booked hotel between 2024-2025"
            },
            legend: {
              display: true
            }
          }
        }}
      />
    </div>
  );
};