import assets from "./app-assets.json";
export const asset = (prefix) =>
  Object.values(assets).find((p) => p.split("/").at(-1).startsWith(prefix)) ||
  "/assets/user-1-4oeL4QIr.jpg";
export const avatar = (n) => asset(`user-${n}-`);
const product = (id, name, price, oldPrice, img, category, gender = "All") => ({
  id,
  name,
  price,
  oldPrice,
  image: asset(`s${img}-`),
  category,
  gender,
  status: "Published",
  stock: 25,
  rating: 4,
  description:
    "Thoughtfully designed for everyday use. Discover dependable quality, considered details, and a finish that fits your style.",
  sku: `MD-${1000 + id}`,
  tags: ["Trending"],
  tax: 10,
  discountType: "No Discount",
  discount: 0,
  template: "Default",
  weight: 0.5,
});
export const products = [
  product(1, "Super Games", 180, 200, 11, "Toys", "Kids"),
  product(2, "Curology Face wash", 275, 300, 1, "Beauty", "Female"),
  product(3, "Body Lotion", 89, 99, 2, "Beauty"),
  product(4, "Smart Watch", 125, 150, 3, "Electronics"),
  product(5, "Polraid One Step", 16, 25, 7, "Electronics"),
  product(6, "Smart Game", 10, 15, 12, "Toys", "Kids"),
  product(7, "Glossy Solution", 29, 36, 4, "Beauty"),
  product(8, "SockSoho", 49, 59, 6, "Fashion", "Male"),
  product(9, "Derma-E", 81, 89, 5, "Beauty"),
  product(10, "Orange Glass", 86, 99, 9, "Kitchen"),
  product(11, "Supercolor 645CL", 12, 15, 10, "Electronics"),
  product(12, "Instant Camera", 149, 199, 8, "Electronics"),
];
export const contacts = [
  "Hanna Gover",
  "Daniel Kristeen",
  "Julian Josephs",
  "Jany Petrovic",
  "Leanne Graham",
  "Dennis Schulist",
  "Kurtis Weissnat",
  "Nicholas Runolfsdottir V",
  "Glenna Reichert",
  "Clementina DuBuque",
].map((name, i) => ({
  id: [123, 452, 565, 785, 564, 980, 521, 450, 212, 152][i],
  name,
  email: name.toLowerCase().replaceAll(" ", "") + "@gmail.com",
  phone: `+${i + 1}23 456 789`,
  joined: `201${(i % 5) + 3}-10-12`,
  role: [
    "Designer",
    "Developer",
    "Accountant",
    "Designer",
    "HR",
    "Designer",
    "Manager",
    "Chairman",
    "Designer",
    "Developer",
  ][i],
  image: avatar((i % 8) + 2),
}));
export const tickets = Array.from({ length: 8 }, (_, i) => ({
  id: i + 1,
  title: [
    "Sed ut perspiciatis unde omnis iste",
    "Consequuntur magni dolores eos qui ratione",
    "Exercitationem ullam corporis",
  ][i % 3],
  description:
    "Please review the details and help us resolve this issue. Our team can provide additional information when needed.",
  assigned: ["Liam", "Steve", "Jack"][i % 3],
  status: [
    "Closed",
    "Pending",
    "Open",
    "Closed",
    "Closed",
    "Pending",
    "Open",
    "Closed",
  ][i],
  date: `2026-10-${String(i + 3).padStart(2, "0")}`,
  priority: ["Medium", "High", "Low"][i % 3],
}));
export const invoices = Array.from({ length: 7 }, (_, i) => ({
  id: 101 + i,
  from: [
    "PineappleInc.",
    "Pineapple.",
    "Incorporation.",
    "PineappleTimes.",
    "FortuneCreation",
    "PineappleTimes.",
    "FortuneCreation",
  ][i],
  to: [
    "Redq Inc.",
    "ME Inc.",
    "Redirwed.",
    "RFc.",
    "Soft solution.",
    "RFc.",
    "Soft solution.",
  ][i],
  fromAddress: "Ganesh glory, Godrej garden city, Ahmedabad.",
  toAddress: "Godrej garden city, Ahmedabad.",
  fromEmail: "first@example.com",
  toEmail: "client@example.com",
  status: [
    "Shipped",
    "Delivered",
    "Pending",
    "Shipped",
    "Delivered",
    "Shipped",
    "Delivered",
  ][i],
  date: "2026-10-14",
  vat: 10,
  items: [
    {
      name: i === 0 ? "Design services" : "Courge",
      price: 10,
      quantity: i === 0 ? 15 : 9,
    },
  ],
}));
export const notes = [
  {
    id: 1,
    title: "A little inspiration",
    body: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Keep your best ideas in one place and turn them into something meaningful.\n\nPlan the next launch, share your notes, and make time for the details.",
    color: "#635bff",
    date: "2026-10-14",
  },
  {
    id: 2,
    title: "Ideas for the next release",
    body: "Review the new dashboard layouts, polish the mobile experience, and share the design system with the team.",
    color: "#ff6692",
    date: "2026-10-13",
  },
  {
    id: 3,
    title: "Project checklist",
    body: "Confirm the timeline.\nPrepare the assets.\nReview the implementation.\nShare the final presentation.",
    color: "#e8bc22",
    date: "2026-10-12",
  },
  {
    id: 4,
    title: "Things worth remembering",
    body: "Great experiences are built from small, thoughtful decisions.",
    color: "#36c76c",
    date: "2026-10-11",
  },
];
export const tasks = [
  "This is first task",
  "Lets do some task on pd",
  "Do some projects on React Native with Flutter",
  "Work on Dashboard Designing",
  "Battle with fire",
  "Do some projects on Reactjs with tailwind",
  "Create a Nextjs Dashboard",
  "Solve Vuejs Project errors",
  "Redesign Overview",
  "Develop React app",
  "Do some task on Nuxtjs",
].map((title, i) => ({
  id: i + 1,
  title,
  description: [1, 7, 10].includes(i)
    ? "Build a clear and thoughtful experience. Review the details with the team."
    : "",
  column: i < 3 ? "Todo" : i < 6 ? "In Progress" : i < 9 ? "Pending" : "Done",
  tag: ["Design", "Development", "Mobile"][i % 3],
  image: [0, 4, 8, 9].includes(i)
    ? `/assets/apps/kanban-${[0, 4, 8, 9].indexOf(i)}.jpg`
    : "",
  date: "2026-10-14",
}));
export const events = [
  {
    id: 1,
    title: "Twice event For two Days",
    date: "2026-10-03",
    end: "2026-10-04",
    color: "#635bff",
    time: "09:00",
  },
  {
    id: 2,
    title: "Lunch with Mr.Raw",
    date: "2026-10-12",
    color: "#16cdc7",
    time: "12:00",
  },
  {
    id: 3,
    title: "Going For Party of Sahs",
    date: "2026-10-15",
    color: "#46caeb",
    time: "18:00",
  },
  {
    id: 4,
    title: "Learn ReactJs",
    date: "2026-10-17",
    color: "#16cdc7",
    time: "10:00",
  },
  {
    id: 5,
    title: "Launching MaterialArt Angular",
    date: "2026-10-21",
    color: "#ff6692",
    time: "09:30",
  },
  {
    id: 6,
    title: "Learn Ionic",
    date: "2026-10-23",
    color: "#e8bc22",
    time: "11:00",
  },
];
export const mails = [
  "Kindly check this latest updated",
  "Literature from 45 BC, making",
  "Latin professor at Hampden-Sydney College",
  "The cities of the world in classical design",
  "All the latest updates from your workspace",
  "A handful of ideas for the next release",
  "A fresh perspective on design",
  "The Extremes of Good and Evil",
].map((subject, i) => ({
  id: i + 1,
  from: ["James Smith", "David Smith", "Maria Rodriguez", "Mary Smith"][i % 4],
  email: "abc@company.com",
  to: "david@example.com",
  subject,
  body:
    "Hello Andrew,\n\nThanks for taking the time to review our latest work. We have made a number of updates to the design and would love to hear your thoughts.\n\nPlease take a look when you have a moment and let us know if there is anything you would like to discuss.\n\nRegards,\n" +
    ["James Smith", "David Smith", "Maria Rodriguez", "Mary Smith"][i % 4],
  label: ["Promotional", "Social", "Health"][i % 3],
  folder: "Inbox",
  starred: i === 2,
  important: i === 0,
  read: i > 2,
  date: "2026-10-" + String(14 - Math.floor(i / 2)).padStart(2, "0"),
}));
export const chatPeople = [
  "James Johnson",
  "Maria Hernandez",
  "David Smith",
  "Loren Rodriguez",
  "Robert Smith",
  "Joseph Sara",
  "Thomas Smith",
  "Davina Elizabeth",
  "Charles Martha",
  "Samuel Ban",
].map((name, i) => ({
  id: i + 1,
  name,
  image: avatar((i % 8) + 2),
  online: i % 3 === 0,
  messages: [
    {
      id: 1,
      text: "Hello! How is the new project coming along?",
      own: false,
      time: "09:30",
    },
    {
      id: 2,
      text: "Looking good. I have a few updates to share with you.",
      own: true,
      time: "09:32",
    },
    {
      id: 3,
      text: "Great! Let’s take a look together.",
      own: false,
      time: "09:33",
    },
  ],
}));
export const articles = [
  ["Early Black Friday Amazon deals: cheap TVs, headphones", "Gadget", 9],
  ["Presented by Max Rushden with Barry Glendenning, Philippe", "Health", 10],
  ["Garmins Instinct Crossover is a rugged hybrid smartwatch", "Gadget", 1],
  ["After Twitter Staff Cuts, Survivors Face Radio Silence", "Lifestyle", 2],
  [
    "Apple is apparently working on a new streamlined accessibility",
    "Design",
    3,
  ],
  ["Why Figma is selling to Adobe for $20 billion", "Design", 4],
  ["Streaming video way before it was cool", "Lifestyle", 5],
  ["As yen tumbles, gadget-loving Japan goes for secondhand", "Gadget", 6],
  [
    "Intel loses bid to revive antitrust case against patent foe Fortress",
    "Social",
    8,
  ],
].map(([title, category, img], i) => ({
  id: i + 1,
  title,
  category,
  image: asset(`blog-img${img}-`),
  slug:
    i === 0
      ? "early-black-friday-amazon-deals-cheap-tvs-headphones"
      : title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
  author: ["Jennie Alvarado", "Lenora Hernandez", "Robert Murray"][i % 3],
  avatar: avatar((i % 6) + 2),
  date: "2026-10-09",
  views: 8686 - i * 351,
}));
export const posts = [
  {
    id: 1,
    author: "David McMichael",
    image: asset("blog-img1-"),
    avatar: avatar(1),
    text: "A fresh perspective on the things we create. Some inspiration from our latest design exploration.",
    likes: 102,
    liked: false,
    comments: [
      {
        name: "Deran Mac",
        text: "Love the colours and the attention to detail!",
      },
    ],
  },
  {
    id: 2,
    author: "Carry Minati",
    avatar: avatar(3),
    text: "Small steps make great progress. Excited to share what we have been working on this week.",
    likes: 67,
    liked: false,
    comments: [],
  },
  {
    id: 3,
    author: "Genelia Desouza",
    avatar: avatar(4),
    text: "Working with an amazing team makes all the difference. Here is to another creative week.",
    likes: 320,
    liked: false,
    comments: [],
  },
];
export const appSeed = {
  products,
  contacts,
  tickets,
  invoices,
  notes,
  tasks,
  events,
  mails,
  chatPeople,
  posts,
  cart: [],
  articleComments: {},
  orders: [],
};
