// icon-map.js
// What this is: a lookup table from the icon "name" strings stored in
// /data files (e.g. category.icon = "Lightbulb") to actual lucide-react
// components. Keeps data files plain/serializable (JSON-friendly) while
// still letting components render real icons.

import {
  Lightbulb,
  Tent,
  Gauge,
  CircleDot,
  Shirt,
  Caravan,
  Star,
} from "lucide-react";

const iconMap = {
  Lightbulb,
  Tent,
  Gauge,
  CircleDot,
  Shirt,
  Caravan,
};

export function resolveIcon(name) {
  return iconMap[name] ?? Star;
}
