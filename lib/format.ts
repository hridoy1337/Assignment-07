import type { Change, Product } from "./types";

const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];

const weekdays = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];

const months = [
  "জানুয়ারি",
  "ফেব্রুয়ারি",
  "মার্চ",
  "এপ্রিল",
  "মে",
  "জুন",
  "জুলাই",
  "আগস্ট",
  "সেপ্টেম্বর",
  "অক্টোবর",
  "নভেম্বর",
  "ডিসেম্বর",
];

const units: Record<string, string> = {
  kg: "কেজি",
  liter: "লিটার",
  litre: "লিটার",
  l: "লিটার",
  dozen: "ডজন",
  dz: "ডজন",
  piece: "পিস",
  pcs: "পিস",
  pc: "পিস",
};

export function toBn(value: string | number) {
  return String(value).replace(/\d/g, (d) => bnDigits[Number(d)]);
}

export function formatPrice(value: number) {
  return toBn(value.toLocaleString("en-US"));
}

export function formatTaka(value: number) {
  return `${formatPrice(value)} টাকা`;
}

export function unitLabel(unit: string) {
  return units[unit.toLowerCase()] ?? unit;
}

export function banglaDate(date = new Date()) {
  const dhaka = new Date(date.toLocaleString("en-US", { timeZone: "Asia/Dhaka" }));
  const day = toBn(dhaka.getDate());
  const year = toBn(dhaka.getFullYear());
  return `${weekdays[dhaka.getDay()]}, ${day} ${months[dhaka.getMonth()]}, ${year}`;
}

export function changeState(change: Change): "up" | "down" | "flat" {
  if (!change.pct) return "flat";
  if (change.dir === "up") return "up";
  if (change.dir === "down") return "down";
  return "flat";
}

export function formatPct(change: Change) {
  const value = toBn(change.pct.toFixed(1));
  const state = changeState(change);
  if (state === "up") return `▲ ${value}%`;
  if (state === "down") return `▼ ${value}%`;
  return `— ${toBn("0.0")}%`;
}

export function topMovers(products: Product[], dir: "up" | "down", count = 6) {
  return products
    .filter((p) => changeState(p.change) === dir)
    .sort((a, b) => b.change.pct - a.change.pct)
    .slice(0, count);
}

export function marketSummary(product: Product) {
  const markets = product.markets ?? [];
  if (markets.length === 0) {
    return { min: product.today, max: product.today, avg: product.today };
  }
  const min = Math.min(...markets.map((m) => m.min));
  const max = Math.max(...markets.map((m) => m.max));
  const avg = Math.round(
    markets.reduce((sum, m) => sum + (m.min + m.max) / 2, 0) / markets.length
  );
  return { min, max, avg };
}

export function groupByDivision<T extends { division: string }>(items: T[]) {
  const groups = new Map<string, T[]>();
  items.forEach((item) => {
    const list = groups.get(item.division) ?? [];
    list.push(item);
    groups.set(item.division, list);
  });
  return Array.from(groups.entries());
}

export const changeTone = {
  up: { text: "text-red-700", badge: "bg-red-100 text-red-700" },
  down: { text: "text-green-700", badge: "bg-green-100 text-green-700" },
  flat: { text: "text-gray-500", badge: "bg-gray-100 text-gray-600" },
};
