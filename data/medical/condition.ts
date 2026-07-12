/**
 * Medical condition structure for ResQ PH.
 * All display text (title, warning signs, do-nots, call-911 triggers,
 * and every decision tree node's text) lives in translations/*.json under
 * "medical.<slug>.*" — this file only defines the graph structure and
 * visual styling, so it never needs to change per language.
 */
import {
  Droplet, Flame, Wind, Zap, Brain, HeartPulse, Bug, Skull,
  Activity, Bone, Thermometer, Waves, CircleAlert,
} from "lucide-react-native";
import type { MedicalCondition } from "../../types/medical";

export const MEDICAL_CONDITIONS: MedicalCondition[] = [
  { slug: "bleeding", icon: Droplet, iconColor: "#DC2626", cardColor: "#FEE2E2", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "i2" },
      { id: "i1", type: "instruction", isEmergencyCall: true, nextId: "q2" },
      { id: "i2", type: "instruction", nextId: "i3" },
      { id: "i3", type: "instruction", nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i4", noNext: "i5" },
      { id: "i4", type: "instruction" },
      { id: "i5", type: "instruction", isEmergencyCall: true, nextId: "q2" },
    ] },
  { slug: "burn", icon: Flame, iconColor: "#DC2626", cardColor: "#FEE2E2", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "i2" },
      { id: "i1", type: "instruction", isEmergencyCall: true, nextId: "i3" },
      { id: "i2", type: "instruction", nextId: "i3" },
      { id: "i3", type: "instruction", nextId: "i4" },
      { id: "i4", type: "instruction" },
    ] },
  { slug: "electric-shock", icon: Zap, iconColor: "#CA8A04", cardColor: "#FEF9C3", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "q2" },
      { id: "i1", type: "instruction", nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i2", noNext: "i3" },
      { id: "i2", type: "instruction", isEmergencyCall: true },
      { id: "i3", type: "instruction", isEmergencyCall: true },
    ] },
  { slug: "snake-bite", icon: Bug, iconColor: "#16A34A", cardColor: "#DCFCE7", startNodeId: "i1",
    nodes: [
      { id: "i1", type: "instruction", isEmergencyCall: true, nextId: "i2" },
      { id: "i2", type: "instruction", nextId: "i3" },
      { id: "i3", type: "instruction", nextId: "q1" },
      { id: "q1", type: "question", yesNext: "i4", noNext: "i5" },
      { id: "i4", type: "instruction", isEmergencyCall: true },
      { id: "i5", type: "instruction" },
    ] },
  { slug: "poisoning", icon: Skull, iconColor: "#7C3AED", cardColor: "#EDE9FE", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "i3" },
      { id: "i1", type: "instruction", nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i2", noNext: "i4" },
      { id: "i2", type: "instruction" },
      { id: "i4", type: "instruction", isEmergencyCall: true },
      { id: "i3", type: "instruction", isEmergencyCall: true },
    ] },
  { slug: "fracture", icon: Bone, iconColor: "#78716C", cardColor: "#F5F5F4", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "i2" },
      { id: "i1", type: "instruction", isEmergencyCall: true },
      { id: "i2", type: "instruction", nextId: "i3" },
      { id: "i3", type: "instruction" },
    ] },
  { slug: "heat-stroke", icon: Thermometer, iconColor: "#EA580C", cardColor: "#FFEDD5", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "i2" },
      { id: "i1", type: "instruction", isEmergencyCall: true },
      { id: "i2", type: "instruction", nextId: "i3" },
      { id: "i3", type: "instruction", nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i4", noNext: "i1" },
      { id: "i4", type: "instruction" },
    ] },
  { slug: "drowning", icon: Waves, iconColor: "#0EA5E9", cardColor: "#E0F2FE", startNodeId: "i1",
    nodes: [
      { id: "i1", type: "instruction", nextId: "q1" },
      { id: "q1", type: "question", yesNext: "i2", noNext: "i3" },
      { id: "i2", type: "instruction", isEmergencyCall: true },
      { id: "i3", type: "instruction", isEmergencyCall: true },
    ] },
  { slug: "fainting", icon: CircleAlert, iconColor: "#2563EB", cardColor: "#DBEAFE", startNodeId: "i1",
    nodes: [
      { id: "i1", type: "instruction", nextId: "q1" },
      { id: "q1", type: "question", yesNext: "i2", noNext: "i3" },
      { id: "i2", type: "instruction" },
      { id: "i3", type: "instruction", isEmergencyCall: true },
    ] },
  { slug: "asthma-attack", icon: Wind, iconColor: "#0891B2", cardColor: "#CFFAFE", startNodeId: "i1",
    nodes: [
      { id: "i1", type: "instruction", nextId: "q1" },
      { id: "q1", type: "question", yesNext: "i2", noNext: "i4" },
      { id: "i2", type: "instruction", nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i3", noNext: "i4" },
      { id: "i3", type: "instruction" },
      { id: "i4", type: "instruction", isEmergencyCall: true },
    ] },
  { slug: "choking", icon: Wind, iconColor: "#DC2626", cardColor: "#FEE2E2", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "i2" },
      { id: "i1", type: "instruction", nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i3", noNext: "i2" },
      { id: "i3", type: "instruction" },
      { id: "i2", type: "instruction", nextId: "i4" },
      { id: "i4", type: "instruction", nextId: "q3" },
      { id: "q3", type: "question", yesNext: "i3", noNext: "i5" },
      { id: "i5", type: "instruction", isEmergencyCall: true, nextId: "q3" },
    ] },
  { slug: "heart-attack", icon: HeartPulse, iconColor: "#DC2626", cardColor: "#FEE2E2", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "i3" },
      { id: "i1", type: "instruction", isEmergencyCall: true, nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i2", noNext: "i4" },
      { id: "i2", type: "instruction" },
      { id: "i4", type: "instruction" },
      { id: "i3", type: "instruction", isEmergencyCall: true },
    ] },
  { slug: "stroke", icon: Brain, iconColor: "#7C3AED", cardColor: "#EDE9FE", startNodeId: "q1",
    nodes: [
      { id: "q1", type: "question", yesNext: "i1", noNext: "q2" },
      { id: "q2", type: "question", yesNext: "i1", noNext: "q3" },
      { id: "q3", type: "question", yesNext: "i1", noNext: "i2" },
      { id: "i1", type: "instruction", isEmergencyCall: true, nextId: "i3" },
      { id: "i3", type: "instruction" },
      { id: "i2", type: "instruction", isEmergencyCall: true },
    ] },
  { slug: "seizure", icon: Activity, iconColor: "#CA8A04", cardColor: "#FEF9C3", startNodeId: "i1",
    nodes: [
      { id: "i1", type: "instruction", nextId: "i2" },
      { id: "i2", type: "instruction", nextId: "q1" },
      { id: "q1", type: "question", yesNext: "i3", noNext: "q2" },
      { id: "i3", type: "instruction", isEmergencyCall: true, nextId: "q2" },
      { id: "q2", type: "question", yesNext: "i4", noNext: "q1" },
      { id: "i4", type: "instruction" },
    ] },
];

export function getMedicalConditionBySlug(slug: string) {
  return MEDICAL_CONDITIONS.find((c) => c.slug === slug);
}