import type { LucideIcon } from "lucide-react-native";

export type DisasterSlug = "typhoon" | "flood" | "earthquake" | "fire" | "volcanic-eruption";

export interface Disaster {
  slug: DisasterSlug;
  icon: LucideIcon;
  iconColor: string;
  cardColor: string;
}