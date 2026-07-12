import type { LucideIcon } from "lucide-react-native";

export type MedicalSlug =
  | "bleeding" | "burn" | "choking" | "electric-shock" | "stroke"
  | "heart-attack" | "snake-bite" | "poisoning" | "seizure" | "fracture"
  | "heat-stroke" | "drowning" | "fainting" | "asthma-attack";

export interface DecisionNodeStructure {
  id: string;
  type: "question" | "instruction";
  yesNext?: string;
  noNext?: string;
  nextId?: string;
  isEmergencyCall?: boolean;
}

export interface MedicalCondition {
  slug: MedicalSlug;
  icon: LucideIcon;
  iconColor: string;
  cardColor: string;
  startNodeId: string;
  nodes: DecisionNodeStructure[];
}