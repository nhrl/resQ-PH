import { User, Baby, PersonStanding } from "lucide-react-native";
import type { CPRGuide } from "../../types/cpr";

export const CPR_GUIDES: CPRGuide[] = [
  { type: "adult", icon: User, iconColor: "#2563EB", cardColor: "#DBEAFE", compressionsPerCycle: 30, breathsPerCycle: 2 },
  { type: "child", icon: PersonStanding, iconColor: "#16A34A", cardColor: "#DCFCE7", compressionsPerCycle: 30, breathsPerCycle: 2 },
  { type: "infant", icon: Baby, iconColor: "#DC2626", cardColor: "#FEE2E2", compressionsPerCycle: 30, breathsPerCycle: 2 },
];

export function getCPRGuideByType(type: string) {
  return CPR_GUIDES.find((g) => g.type === type);
}