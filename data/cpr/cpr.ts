import { User, Baby, PersonStanding } from "lucide-react-native";
import type { CPRGuide } from "../../types/cpr";

export const CPR_GUIDES: CPRGuide[] = [
  {
    type: "adult",
    icon: User,
    iconColor: "#2563EB",
    cardColor: "#DBEAFE",
    compressionsPerCycle: 30,
    breathsPerCycle: 2,
    stepImages: ["adult-step-1.png", "adult-step-2.png", "adult-step-3.png"],
  },
  {
    type: "child",
    icon: PersonStanding,
    iconColor: "#16A34A",
    cardColor: "#DCFCE7",
    compressionsPerCycle: 30,
    breathsPerCycle: 2,
    stepImages: ["child-step-1.png", "child-step-2.png", "child-step-3.png"],
  },
  {
    type: "infant",
    icon: Baby,
    iconColor: "#DC2626",
    cardColor: "#FEE2E2",
    compressionsPerCycle: 30,
    breathsPerCycle: 2,
    stepImages: ["infant-step-1.png", "infant-step-2.png", "infant-step-3.png"],
  },
];

export function getCPRGuideByType(type: string) {
  return CPR_GUIDES.find((g) => g.type === type);
}