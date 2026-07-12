/**
 * Fixed national/local emergency hotlines for the Philippines.
 * `nameKey` points to a translation key resolved at render time —
 * this file itself never changes per language.
 */
import type { DefaultHotline } from "../../types/contact";

export interface DefaultHotlineData {
  id: string;
  nameKey: string;
  phoneNumber: string;
  category: "hotline";
}

export const DEFAULT_HOTLINES: DefaultHotlineData[] = [
  { id: "hotline-911", nameKey: "hotlines.nationalEmergency", phoneNumber: "911", category: "hotline" },
  { id: "hotline-pnp", nameKey: "hotlines.pnp", phoneNumber: "117", category: "hotline" },
  { id: "hotline-bfp", nameKey: "hotlines.bfp", phoneNumber: "911", category: "hotline" },
  { id: "hotline-redcross", nameKey: "hotlines.redCross", phoneNumber: "143", category: "hotline" },
  { id: "hotline-ndrrmc", nameKey: "hotlines.ndrrmc", phoneNumber: "(02) 8911-5061", category: "hotline" },
];