// Reference-aligned demo series. These are not live financial or sales feeds.
const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"];
const gradient = [4, 3, 10, 9, 35, 19, 22, 9, 12, 7, 19, 5, 13, 9, 17, 2, 6, 4];
let close = 6629;
export const candles = Array.from({ length: 48 }, (_, i) => {
  const open = close;
  close = +(
    open +
    Math.sin(i * 1.83) * 5.8 +
    (i < 22 ? -0.8 : i < 35 ? -2.2 : 0.2)
  ).toFixed(2);
  const high = +(Math.max(open, close) + 3 + (i % 4)).toFixed(2),
    low = +(Math.min(open, close) - 2 - (i % 3)).toFixed(2);
  return {
    x: Date.UTC(2018, 9, 6, 22, 30) + i * 30 * 60 * 1000,
    y: [open, high, low, close],
  };
});
export const chartExamples = {
  "line-chart": {
    title: "Line Chart",
    type: "line",
    series: [
      { name: "High - 2025", data: [28, 29, 33, 36, 32, 32, 33] },
      { name: "Low - 2025", data: [12, 11, 14, 18, 17, 13, 13] },
    ],
    labels: months,
    xTitle: "Month",
    colors: ["#635bff", "#16cdc7"],
  },
  "gredient-chart": {
    title: "Gredient Chart",
    type: "line",
    series: [
      {
        name: "Sample value",
        data: gradient.map((y, i) => ({ x: Date.UTC(2000, i + 1, 1), y })),
      },
    ],
    labels: [],
    datetime: true,
    colors: ["#2196f3"],
    gradient: true,
  },
  "area-chart": {
    title: "Area Chart",
    type: "area",
    series: [
      { name: "Sales Summery 1", data: [31, 40, 28, 51, 42, 109, 100] },
      { name: "Sales Summery 2", data: [11, 32, 45, 32, 34, 52, 41] },
    ],
    labels: ["00:00", "01:00", "02:00", "03:00", "04:00", "05:00", "06:00"],
    colors: ["#635bff", "#16cdc7"],
  },
  "candlestick-chart": {
    title: "Candlestick Chart",
    type: "candlestick",
    series: [{ name: "OHLC sample", data: candles }],
    labels: [],
    datetime: true,
    colors: ["#635bff", "#16cdc7"],
  },
  "column-chart": {
    title: "Column Chart",
    type: "bar",
    series: [
      { name: "Desktop", data: [44, 55, 57, 56, 61, 58, 63, 60, 66] },
      { name: "Mobile", data: [76, 85, 101, 98, 87, 105, 91, 114, 94] },
      { name: "Other", data: [35, 41, 36, 26, 45, 48, 52, 53, 41] },
    ],
    labels: ["Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct"],
    yTitle: "$ (thousands)",
    colors: ["#ff6692", "#635bff", "#16cdc7"],
  },
};
