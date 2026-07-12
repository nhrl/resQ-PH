import { CloudRain, Waves, Earth, Flame, Mountain } from "lucide-react-native";
import type { Disaster } from "../../types/disaster";

export const DISASTERS: Disaster[] = [
  { slug: "typhoon", icon: CloudRain, iconColor: "#2563EB", cardColor: "#DBEAFE" },
  { slug: "flood", icon: Waves, iconColor: "#0EA5E9", cardColor: "#E0F2FE" },
  { slug: "earthquake", icon: Earth, iconColor: "#CA8A04", cardColor: "#FEF9C3" },
  { slug: "fire", icon: Flame, iconColor: "#DC2626", cardColor: "#FEE2E2" },
  { slug: "volcanic-eruption", icon: Mountain, iconColor: "#EA580C", cardColor: "#FFEDD5" },
];

export function getDisasterBySlug(slug: string) {
  return DISASTERS.find((d) => d.slug === slug);
}