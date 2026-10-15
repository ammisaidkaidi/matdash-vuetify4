import { avatar, asset } from "./app-seed";
const projects = [
  ["Sunil Joshi", "Elite Admin", "Web Designer", "Active", 3.9],
  [
    "Andrew McDownland",
    "Real Homes WP Template",
    "Project Manager",
    "Pending",
    24500,
  ],
  [
    "Christopher Jamil",
    "MedicalPro WP Template",
    "Project Manager",
    "Completed",
    12800,
  ],
  ["Nirav Joshi", "Hosting Press HTML", "Frontend Engineer", "Active", 2400],
  [
    "Micheal Doe",
    "Helping Hands WP Template",
    "Content Writer",
    "Cancel",
    9300,
  ],
  [
    "Daniel Kristeen",
    "Real Homes WP Template",
    "Project Manager",
    "Pending",
    24500,
  ],
  [
    "Julian Josephs",
    "MedicalPro WP Template",
    "Project Manager",
    "Completed",
    12800,
  ],
  ["Jan Petrovic", "Elite Admin", "Web Designer", "Active", 3.9],
  [
    "Leanne Graham",
    "Real Homes WP Template",
    "Project Manager",
    "Pending",
    24500,
  ],
  ["Glenna Reichert", "Monster Admin", "Web Developer", "Pending", 30500],
];
export const projectRows = projects.map(
  ([name, project, post, status, budget], i) => ({
    id: i + 1,
    name,
    project,
    post,
    status,
    budget,
    avatar: avatar((i % 10) + 1),
    team: [["S", "D"], ["N", "X", "A"], ["X"], ["X", "Y"], ["S"]][i % 5],
    selectable: status !== "Cancel",
    description: `${project} is a sample project assigned to ${name}. This row demonstrates expansion; it is not a live project record.`,
  }),
);
export const projectHeaders = [
  { title: "Name", key: "name" },
  { title: "Project Name", key: "project" },
  { title: "Post", key: "post" },
  { title: "Status", key: "status" },
  { title: "Budget", key: "budget", align: "end" },
];
export const budgetLabel = (n) =>
  n >= 1000 ? "$" + (n / 1000).toFixed(1) + "k" : "$" + n;
export const statusColor = (s) =>
  ({
    active: "primary",
    pending: "warning",
    completed: "secondary",
    cancel: "error",
    cancelled: "error",
    paid: "primary",
    refunded: "secondary",
    offline: "grey",
  })[String(s).toLowerCase()] || "primary";
export const customerRows = [
  "Olivia Rhye",
  "Barbara Steele",
  "Leonard Gordon",
  "Evelyn Pope",
  "Tommy Garza",
  "Isabel Vasquez",
].map((name, i) => ({
  id: i + 1,
  name,
  handle: "@" + name.split(" ").at(-1).toLowerCase(),
  email: i % 2 ? "steele@ui.com" : "olivia@ui.com",
  status: i % 3 === 1 ? "offline" : "active",
  project: [
    "Xtreme admin",
    "Adminpro admin",
    "Monster admin",
    "Materialpro admin",
    "Elegant admin",
    "Modernize admin",
  ][i],
  projectStatus: ["active", "cancel", "active", "pending", "cancel", "pending"][
    i
  ],
  avatar: avatar(i + 2),
  teams: [
    ["Design", "Product"],
    ["Product", "Operations"],
    ["Finance", "Customer Success"],
    ["Operations", "Design"],
    ["Product"],
    ["Customer Success"],
  ][i],
  progress: [60, 30, 45, 37, 87, 32][i],
  invoice: "INV-" + (3066 + i),
  invoiceStatus: [
    "paid",
    "cancelled",
    "paid",
    "refunded",
    "cancelled",
    "refunded",
  ][i],
}));
export const authors = [
  "Top Authors",
  "Popular Authors",
  "New Users",
  "Active Customers",
  "Bestseller Template",
  "New Authors",
].map((name, i) => ({
  id: i + 1,
  name,
  subtitle: [
    "Successful Fellas",
    "Most Successful",
    "Awesome Users",
    "Best Customers",
    "Amazing Templates",
    "Successful Fellas",
  ][i],
  image: asset("blog-img" + (i + 1) + "-"),
  courses: [
    ["Angular", "PHP"],
    ["Bootstrap"],
    ["Reactjs", "Angular"],
    ["Bootstrap"],
    ["Angular", "Reactjs"],
    ["Angular", "Java"],
  ][i],
  users: [4300, 1200, 2000, 1500, 9500, 4800][i],
}));
export const gpuRows = [
  ["Nebula GTX 3080", 699.99, 4, true],
  ["Galaxy RTX 3080", 799.99, 5, false],
  ["Orion RX 6800 XT", 649.99, 4, true],
  ["Vortex RTX 3090", 1499.99, 5, true],
  ["Cosmos GTX 1660 Super", 299.99, 3, false],
].map(([name, price, rating, stock], i) => ({
  id: i + 1,
  name,
  price,
  rating,
  stock,
}));
export const dessertSeed = [
  ["Frozen Yogurt", 159, 6, 24, 4],
  ["Ice cream sandwich", 237, 9, 37, 4.3],
  ["Eclair", 262, 16, 23, 6],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16, 49, 3.9],
  ["Jelly bean", 375, 0, 94, 0],
  ["Lollipop", 392, 0.2, 98, 0],
  ["Honeycomb", 408, 3.2, 87, 6.5],
  ["Donut", 452, 25, 51, 4.9],
  ["KitKat", 518, 26, 65, 7],
].map(([name, calories, fat, carbs, protein], i) => ({
  id: i + 1,
  name,
  calories,
  fat,
  carbs,
  protein,
}));
