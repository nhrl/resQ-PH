/**
 * Manages user-added emergency contacts, persisted to AsyncStorage.
 * No SQLite needed here — a flat list with add/delete only, per spec.
 */
import { create } from "zustand";
import AsyncStorage from "@react-native-async-storage/async-storage";

import type { EmergencyContact, ContactCategory } from "../types/contact";

const CONTACTS_STORAGE_KEY = "@resqph/emergencyContacts";

interface ContactsState {
  contacts: EmergencyContact[];
  isLoaded: boolean;
  loadContacts: () => Promise<void>;
  addContact: (name: string, phoneNumber: string, category: ContactCategory) => Promise<void>;
  deleteContact: (id: string) => Promise<void>;
}

async function persist(contacts: EmergencyContact[]): Promise<void> {
  await AsyncStorage.setItem(CONTACTS_STORAGE_KEY, JSON.stringify(contacts));
}

export const useContactsStore = create<ContactsState>((set, get) => ({
  contacts: [],
  isLoaded: false,

  loadContacts: async () => {
    const stored = await AsyncStorage.getItem(CONTACTS_STORAGE_KEY);
    set({
      contacts: stored ? (JSON.parse(stored) as EmergencyContact[]) : [],
      isLoaded: true,
    });
  },

  addContact: async (name, phoneNumber, category) => {
    const newContact: EmergencyContact = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      name: name.trim(),
      phoneNumber: phoneNumber.trim(),
      category,
    };
    const updated = [...get().contacts, newContact];
    set({ contacts: updated });
    await persist(updated);
  },

  deleteContact: async (id) => {
    const updated = get().contacts.filter((contact) => contact.id !== id);
    set({ contacts: updated });
    await persist(updated);
  },
}));