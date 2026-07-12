/**
 * Shared types for the Emergency Contacts feature.
 * Default hotlines (911, Police, Fire, etc.) are fixed and non-deletable.
 * User contacts (Family, Doctor, Barangay responder, etc.) are stored in
 * AsyncStorage and can be freely added or deleted — no editing needed.
 */
export type ContactCategory =
  | "family"
  | "doctor"
  | "barangay"
  | "hospital"
  | "other";

export interface DefaultHotline {
  id: string;
  name: string;
  phoneNumber: string;
  category: "hotline";
}

export interface EmergencyContact {
  id: string;
  name: string;
  phoneNumber: string;
  category: ContactCategory;
}