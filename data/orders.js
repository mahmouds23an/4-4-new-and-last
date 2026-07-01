// orders.js
// What this is: mock order records (used by the future Orders / Order
// Tracking pages). Not consumed on the Home/Login pages yet, but kept here
// so services/orders.js has real shape to fall back to as those pages are built.

const orders = [
  {
    id: "ORD-10293",
    date: "2026-06-20",
    status: "shipped",
    total: 2949,
    currency: "SAR",
    items: [
      { productId: "p001", quantity: 1, price: 1699 },
      { productId: "p004", quantity: 1, price: 1899 },
    ],
    timeline: ["received", "processing", "packed", "shipped"],
  },
];

export default orders;
