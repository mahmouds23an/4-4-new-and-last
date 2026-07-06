// orders.js (service)
// What this is: data access point for order history / tracking. Stubbed
// for now (no Orders page yet in this milestone) but wired the same way as
// every other service so the Orders page can be added later with zero
// architecture changes.

import { apiGet } from "./apiClient";
import mockOrders from "@/data/orders";

export async function getOrders(userId) {
  // const apiData = await apiGet(`/orders?userId=${userId}`);
  // return apiData ?? mockOrders;
  return mockOrders;
}
