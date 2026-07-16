import type { LucideIcon } from "lucide-react-native";

export type CPRType = "adult" | "child" | "infant";

export interface CPRGuide {
  type: CPRType;
  icon: LucideIcon;
  iconColor: string;
  cardColor: string;
  compressionsPerCycle: number;
  breathsPerCycle: number;
  stepImages: string[];
}